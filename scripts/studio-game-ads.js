(function setupDashaunStudioGameAds() {
  const AD_TAGS = [
    { kind: 'popunder', src: 'https://pl29552407.effectivecpmnetwork.com/8c/75/87/8c7587438d9de51e8f7c643c7b345748.js' },
  ];
  const POPUNDER_COOLDOWN_MS = 60000;
  const POPUNDER_LAST_OPEN_KEY = 'playrbb_popunder_last_open_at';

  let injectedAds = false;

  function getPopunderLastOpenAt() {
    try {
      const stored = Number(window.sessionStorage && window.sessionStorage.getItem(POPUNDER_LAST_OPEN_KEY));
      return Number.isFinite(stored) && stored > 0 ? stored : 0;
    } catch (_error) {
      return Number(window.__playrbbLastPopunderOpenAt || 0) || 0;
    }
  }

  function stampPopunderOpen() {
    const now = Date.now();
    try {
      if (window.sessionStorage) window.sessionStorage.setItem(POPUNDER_LAST_OPEN_KEY, String(now));
    } catch (_error) {
      window.__playrbbLastPopunderOpenAt = now;
    }
  }

  function isPopunderCooldownActive() {
    return Date.now() - getPopunderLastOpenAt() < POPUNDER_COOLDOWN_MS;
  }

  const nativeOpen = typeof window.open === 'function' ? window.open.bind(window) : null;
  if (nativeOpen) {
    window.open = function playrbbCooldownGuardedOpen() {
      if (isPopunderCooldownActive()) return null;
      stampPopunderOpen();
      return nativeOpen.apply(window, arguments);
    };
  }

  function injectAdTag(tag) {
    const target = document.body || document.documentElement;
    if (!target) return false;
    const script = document.createElement('script');
    if (tag.zone) script.dataset.zone = tag.zone;
    script.src = tag.src;
    script.async = true;
    script.dataset.cfasync = 'false';
    target.appendChild(script);
    return true;
  }

  function injectAllAdTags() {
    if (injectedAds) return true;
    injectedAds = true;
    AD_TAGS.forEach(injectAdTag);
    return true;
  }

  window.playrbbStartScheduledAdBreaks = injectAllAdTags;
  window.playrbbRunMonetagAction = injectAllAdTags;

  window.playrbbScheduleNextAdBreak = function () {};
  window.playrbbEnsureMonetagTag = function () { return false; };
  window.playrbbRemoveMonetagTag = function () { return false; };
  window.playrbbAllowRewardedAdOpen = function () { return 0; };
  window.playrbbBlockGeneralAdTabsUntil = function () { return 0; };
  window.playrbbAreGeneralAdTabsBlocked = function () { return false; };
  window.playrbbIsAdRedirectCooldownActive = function () { return false; };
  window.playrbbGetAdRedirectCooldownRemainingMs = function () { return 0; };
  window.playrbbIsAdTagLoadCooldownActive = function () { return false; };
  window.playrbbGetAdTagLoadCooldownRemainingMs = function () { return 0; };

  window.playrbbEntitlement = window.playrbbEntitlement || {
    shouldShowGameplayAds: () => true,
    syncGeneralAds: () => false,
    removeGeneralAds: () => false,
    ensureGeneralAds: () => false,
    runRewardedAd: () => injectAllAdTags(),
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAllAdTags, { once: true });
  } else {
    injectAllAdTags();
  }
})();
