(function setupDashaunStudioGameAds() {
  const AD_SRC = 'https://quge5.com/88/tag.min.js';
  const AD_ZONE = '228378';
  const DEFAULT_BLOCK_MS = 12000;
  const ACTION_OPEN_ALLOW_MS = 4000;
  const REDIRECT_COOLDOWN_MS = 120000;
  const REDIRECT_COOLDOWN_KEY = 'playrbb_ad_redirect_last_at';
  const TAG_LOAD_COOLDOWN_KEY = 'playrbb_ad_tag_loaded_last_at';
  const AD_BREAK_INTERVAL_MS = 120000;
  const INITIAL_AD_BREAK_DELAY_MS = 1500;
  const nativeOpen = typeof window.open === 'function' ? window.open.bind(window) : null;
  let blockUntil = 0;
  let clearTimer = 0;
  let allowedActionOpens = 0;
  let actionOpenResetTimer = 0;
  let adBreakTimer = 0;
  let adBreakTickTimer = 0;
  let nextAdBreakAt = 0;
  let adBreakNoticeEl = null;
  let adBreakOpenUntil = 0;

  function getStoredTime(key, fallbackKey) {
    try {
      const stored = Number(window.sessionStorage && window.sessionStorage.getItem(key));
      return Number.isFinite(stored) && stored > 0 ? stored : 0;
    } catch (_error) {
      return Number(window[fallbackKey] || 0) || 0;
    }
  }

  function setStoredTime(key, fallbackKey, value) {
    try {
      if (window.sessionStorage) window.sessionStorage.setItem(key, String(value));
    } catch (_error) {
      window[fallbackKey] = value;
    }
  }

  function getCooldownRemainingMs(key, fallbackKey) {
    const remaining = REDIRECT_COOLDOWN_MS - (Date.now() - getStoredTime(key, fallbackKey));
    return remaining > 0 ? remaining : 0;
  }

  function getRedirectCooldownRemainingMs() {
    return getCooldownRemainingMs(REDIRECT_COOLDOWN_KEY, '__playrbbLastAdRedirectOpenAt');
  }

  function getTagLoadCooldownRemainingMs() {
    return getCooldownRemainingMs(TAG_LOAD_COOLDOWN_KEY, '__playrbbLastAdTagLoadAt');
  }

  function isRedirectCooldownActive() {
    return getRedirectCooldownRemainingMs() > 0;
  }

  function markAdTagLoad() {
    setStoredTime(TAG_LOAD_COOLDOWN_KEY, '__playrbbLastAdTagLoadAt', Date.now());
  }

  function removeMonetagScripts() {
    const scripts = document.querySelectorAll(`script[src="${AD_SRC}"][data-zone="${AD_ZONE}"]`);
    scripts.forEach((script) => script.remove());
    return scripts.length > 0;
  }

  function areSurfaceGeneralAdsBlocked() {
    try {
      return typeof window.playrbbShouldBlockGeneralAdTabs === 'function'
        && !!window.playrbbShouldBlockGeneralAdTabs();
    } catch (_error) {
      return false;
    }
  }

  function markAdRedirectOpen() {
    const now = Date.now();
    setStoredTime(REDIRECT_COOLDOWN_KEY, '__playrbbLastAdRedirectOpenAt', now);
    setStoredTime(TAG_LOAD_COOLDOWN_KEY, '__playrbbLastAdTagLoadAt', now);
    removeMonetagScripts();
  }

  function getBlockDuration(rawValue) {
    const parsed = Number(rawValue);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_BLOCK_MS;
  }

  function isAdBreakOpenNow() {
    return Date.now() < adBreakOpenUntil;
  }

  function openAdBreakWindow(ms = ACTION_OPEN_ALLOW_MS) {
    const duration = getBlockDuration(ms);
    adBreakOpenUntil = Math.max(adBreakOpenUntil, Date.now() + duration);
    return adBreakOpenUntil;
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
    setAdBreakNotice('Ad break', true);
    const remaining = getRedirectCooldownRemainingMs();
    const didRun = remaining <= 0 && window.playrbbRunMonetagAction();
    const nextDelay = didRun ? AD_BREAK_INTERVAL_MS : Math.max(remaining || 10000, 10000);
    window.setTimeout(function hideAdBreakNotice() {
      setAdBreakNotice('', false);
      scheduleAdBreak(nextDelay);
    }, 2200);
  }

  function areGeneralAdTabsBlockedNow() {
    return Date.now() < blockUntil || areSurfaceGeneralAdsBlocked() || isRedirectCooldownActive() || !isAdBreakOpenNow();
  }

  window.playrbbGetAdRedirectCooldownRemainingMs = getRedirectCooldownRemainingMs;
  window.playrbbIsAdRedirectCooldownActive = isRedirectCooldownActive;
  window.playrbbMarkAdRedirectOpen = markAdRedirectOpen;
  window.playrbbGetAdTagLoadCooldownRemainingMs = getTagLoadCooldownRemainingMs;
  window.playrbbScheduleNextAdBreak = scheduleAdBreak;
  window.playrbbOpenAdBreakWindow = openAdBreakWindow;

  window.playrbbBlockGeneralAdTabsUntil = function playrbbBlockGeneralAdTabsUntil(ms) {
    const duration = getBlockDuration(ms);
    blockUntil = Math.max(blockUntil, Date.now() + duration);
    if (clearTimer) window.clearTimeout(clearTimer);
    clearTimer = window.setTimeout(function clearGeneralAdBlock() {
      if (Date.now() >= blockUntil) blockUntil = 0;
    }, duration + 50);
    return blockUntil;
  };

  window.playrbbAreGeneralAdTabsBlocked = function playrbbAreGeneralAdTabsBlocked() {
    return areGeneralAdTabsBlockedNow();
  };

  window.playrbbAllowRewardedAdOpen = function playrbbAllowRewardedAdOpen(count, ms) {
    const nextCount = Math.max(1, Math.round(Number(count) || 1));
    const duration = getBlockDuration(ms || ACTION_OPEN_ALLOW_MS);
    allowedActionOpens = Math.max(allowedActionOpens, nextCount);
    if (actionOpenResetTimer) window.clearTimeout(actionOpenResetTimer);
    actionOpenResetTimer = window.setTimeout(function clearAllowedActionOpens() {
      allowedActionOpens = 0;
      actionOpenResetTimer = 0;
    }, duration);
    return allowedActionOpens;
  };

  if (nativeOpen) {
    window.open = function playrbbGuardedWindowOpen() {
      if (allowedActionOpens > 0) {
        if (isRedirectCooldownActive() || !isAdBreakOpenNow()) return null;
        allowedActionOpens -= 1;
        if (allowedActionOpens <= 0 && actionOpenResetTimer) {
          window.clearTimeout(actionOpenResetTimer);
          actionOpenResetTimer = 0;
        }
        adBreakOpenUntil = 0;
        markAdRedirectOpen();
        return nativeOpen.apply(window, arguments);
      }
      if (areGeneralAdTabsBlockedNow()) return null;
      adBreakOpenUntil = 0;
      markAdRedirectOpen();
      return nativeOpen.apply(window, arguments);
    };
  }

  function guardPriorityAdInteraction(event) {
    if (typeof Element === 'undefined') return;
    const target = event.target instanceof Element
      ? event.target.closest('[data-block-general-ad-tabs]')
      : null;
    if (!target) return;
    window.playrbbBlockGeneralAdTabsUntil(target.getAttribute('data-block-general-ad-tabs'));
  }

  document.addEventListener('pointerdown', guardPriorityAdInteraction, true);
  document.addEventListener('mousedown', guardPriorityAdInteraction, true);
  document.addEventListener('touchstart', guardPriorityAdInteraction, true);
  document.addEventListener('click', guardPriorityAdInteraction, true);

  window.playrbbEnsureMonetagTag = function playrbbEnsureMonetagTag() {
    removeMonetagScripts();
    return false;
  };

  window.playrbbRemoveMonetagTag = function playrbbRemoveMonetagTag() {
    return removeMonetagScripts();
  };

  window.playrbbRunMonetagAction = function playrbbRunMonetagAction() {
    const head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return false;
    if (isRedirectCooldownActive()) return false;
    removeMonetagScripts();
    openAdBreakWindow(ACTION_OPEN_ALLOW_MS);
    if (typeof window.playrbbAllowRewardedAdOpen === 'function') window.playrbbAllowRewardedAdOpen(1, ACTION_OPEN_ALLOW_MS);
    const script = document.createElement('script');
    script.src = AD_SRC;
    script.dataset.zone = AD_ZONE;
    script.dataset.runtime = 'true';
    script.async = true;
    script.dataset.cfasync = 'false';
    script.addEventListener('load', function removeRuntimeTag() { script.remove(); }, { once: true });
    script.addEventListener('error', function removeFailedRuntimeTag() { script.remove(); }, { once: true });
    head.appendChild(script);
    window.setTimeout(function closeAdBreakWindow() {
      adBreakOpenUntil = 0;
      removeMonetagScripts();
    }, ACTION_OPEN_ALLOW_MS + 1000);
    markAdTagLoad();
    return true;
  };

  window.playrbbEntitlement = window.playrbbEntitlement || {
    shouldShowGameplayAds: () => true,
    syncGeneralAds: () => window.playrbbEnsureMonetagTag(),
    removeGeneralAds: () => window.playrbbRemoveMonetagTag(),
    ensureGeneralAds: () => window.playrbbEnsureMonetagTag(),
    runRewardedAd: () => window.playrbbRunMonetagAction(),
  };

  function startGeneralAds() {
    window.playrbbRemoveMonetagTag();
    scheduleAdBreak(INITIAL_AD_BREAK_DELAY_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startGeneralAds, { once: true });
  } else {
    startGeneralAds();
  }
})();
