(function setupDashaunStudioGameAds() {
  const AD_TAGS = [
    { kind: 'popunder', src: 'https://al5sm.com/tag.min.js', zone: '11057410' },
    { kind: 'vignette', src: 'https://n6wxm.com/vignette.min.js', zone: '11057419' },
  ];
  const AD_BREAK_INTERVAL_MS = 60000;
  const INITIAL_AD_BREAK_DELAY_MS = 60000;

  let adBreakTimer = 0;
  let adBreakTickTimer = 0;
  let nextAdBreakAt = 0;
  let adBreakNoticeEl = null;
  let armedForNextClick = false;
  let armedClickListener = null;

  function pickAdTag() {
    return AD_TAGS[Math.floor(Math.random() * AD_TAGS.length)];
  }

  function injectAdTag(tag) {
    const target = document.body || document.documentElement;
    if (!target) return false;
    const script = document.createElement('script');
    script.dataset.zone = tag.zone;
    script.src = tag.src;
    script.async = true;
    script.dataset.cfasync = 'false';
    target.appendChild(script);
    return true;
  }

  function formatSeconds(ms) {
    return String(Math.max(1, Math.ceil(ms / 1000)));
  }

  function ensureAdBreakNotice() {
    if (adBreakNoticeEl && document.body && document.body.contains(adBreakNoticeEl)) return adBreakNoticeEl;
    if (!document.body) return null;
    const notice = document.createElement('div');
    notice.setAttribute('aria-live', 'polite');
    notice.style.cssText = [
      'position:fixed',
      'right:14px',
      'bottom:14px',
      'z-index:99998',
      'padding:7px 10px',
      'border-radius:6px',
      'background:rgba(8,10,16,0.62)',
      'border:1px solid rgba(255,255,255,0.14)',
      'color:rgba(255,255,255,0.78)',
      'font:600 11px/1.25 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
      'letter-spacing:0.02em',
      'pointer-events:none',
      'opacity:0',
      'transform:translateY(6px)',
      'transition:opacity 180ms ease,transform 180ms ease',
      'backdrop-filter:blur(8px)',
    ].join(';');
    document.body.appendChild(notice);
    adBreakNoticeEl = notice;
    return adBreakNoticeEl;
  }

  function setAdBreakNotice(text, visible) {
    const notice = ensureAdBreakNotice();
    if (!notice) return;
    notice.textContent = text || '';
    notice.style.opacity = visible ? '1' : '0';
    notice.style.transform = visible ? 'translateY(0)' : 'translateY(6px)';
  }

  function updateAdBreakNotice() {
    if (armedForNextClick) {
      setAdBreakNotice('Ad on next click', true);
      return;
    }
    if (!nextAdBreakAt) {
      setAdBreakNotice('', false);
      return;
    }
    const remaining = nextAdBreakAt - Date.now();
    if (remaining > 0) {
      setAdBreakNotice(`Next ad break in ${formatSeconds(remaining)}s`, true);
      return;
    }
    setAdBreakNotice('', false);
  }

  function disarmAd() {
    if (armedClickListener) {
      try { window.removeEventListener('click', armedClickListener, true); } catch (_error) {}
      armedClickListener = null;
    }
    armedForNextClick = false;
  }

  function armForNextClick() {
    disarmAd();
    armedForNextClick = true;
    armedClickListener = function adArmedClickHandler() {
      injectAdTag(pickAdTag());
      disarmAd();
      scheduleAdBreak(AD_BREAK_INTERVAL_MS);
    };
    window.addEventListener('click', armedClickListener, { capture: true, once: true });
    updateAdBreakNotice();
  }

  function scheduleAdBreak(delayMs) {
    const delay = Math.max(0, Number(delayMs) || 0);
    if (adBreakTimer) window.clearTimeout(adBreakTimer);
    if (adBreakTickTimer) window.clearInterval(adBreakTickTimer);
    nextAdBreakAt = Date.now() + delay;
    updateAdBreakNotice();
    adBreakTickTimer = window.setInterval(updateAdBreakNotice, 1000);
    adBreakTimer = window.setTimeout(runScheduledAdBreak, delay);
  }

  function runScheduledAdBreak() {
    if (adBreakTimer) window.clearTimeout(adBreakTimer);
    if (adBreakTickTimer) window.clearInterval(adBreakTickTimer);
    adBreakTimer = 0;
    adBreakTickTimer = 0;
    nextAdBreakAt = 0;
    armForNextClick();
  }

  function startAdBreaks() {
    scheduleAdBreak(INITIAL_AD_BREAK_DELAY_MS);
  }

  window.playrbbScheduleNextAdBreak = scheduleAdBreak;
  window.playrbbStartScheduledAdBreaks = startAdBreaks;
  window.playrbbRunMonetagAction = function playrbbRunMonetagAction() {
    return injectAdTag(pickAdTag());
  };

  window.playrbbEnsureMonetagTag = function () { return false; };
  window.playrbbRemoveMonetagTag = function () { return false; };
  window.playrbbAllowRewardedAdOpen = function () { return 0; };
  window.playrbbBlockGeneralAdTabsUntil = function () { return 0; };
  window.playrbbAreGeneralAdTabsBlocked = function () { return !armedForNextClick; };
  window.playrbbIsAdRedirectCooldownActive = function () { return false; };
  window.playrbbGetAdRedirectCooldownRemainingMs = function () { return 0; };
  window.playrbbIsAdTagLoadCooldownActive = function () { return false; };
  window.playrbbGetAdTagLoadCooldownRemainingMs = function () { return 0; };

  window.playrbbEntitlement = window.playrbbEntitlement || {
    shouldShowGameplayAds: () => true,
    syncGeneralAds: () => false,
    removeGeneralAds: () => false,
    ensureGeneralAds: () => false,
    runRewardedAd: () => window.playrbbRunMonetagAction(),
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAdBreaks, { once: true });
  } else {
    startAdBreaks();
  }
})();
