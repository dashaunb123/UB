import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const requestedPort = Number(process.env.PORT) || 8000;
const host = process.env.HOST || '127.0.0.1';
const maxPortAttempts = 20;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.py': 'text/plain; charset=utf-8'
};

function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0] || '/');
  const requested = decoded === '/' ? '/index.html' : decoded;
  const normalized = normalize(requested).replace(/^(\.\.[/\\])+/, '');
  return join(root, normalized);
}

const server = createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0] || '/';
  if (req.method === 'POST' && urlPath === '/debug-log') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 64 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const scope = payload.scope || 'client';
        const event = payload.event || 'log';
        console.log(`[${scope}] ${event}`, payload.data || {});
      } catch (err) {
        console.log('[client] malformed debug log');
      }
      res.writeHead(204);
      res.end();
    });
    return;
  }

  const filePath = resolvePath(req.url || '/');
  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const type = mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': 'no-store'
  });
  createReadStream(filePath).pipe(res);
});

function listen(port, attemptsLeft = maxPortAttempts) {
  server.once('error', err => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0 && !process.env.PORT) {
      console.log(`Port ${port} is busy, trying ${port + 1}...`);
      listen(port + 1, attemptsLeft - 1);
      return;
    }
    throw err;
  });

  server.listen(port, host, () => {
    console.log(`University Basketball running at http://${host}:${port}/`);
  });
}

listen(requestedPort);
