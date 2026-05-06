# UB

Run locally:

```bash
npm start
```

Then open `http://127.0.0.1:8000/`.

Run as an Electron app:

```bash
npm run electron
```

Package desktop builds:

```bash
npm run package:mac
npm run package:win
```

Build outputs are written to `dist/`. The mac build creates a universal Apple Silicon/Intel app. The Windows build creates NSIS installers for x64, arm64, and a combined installer.
