(function setupDashaunStudioGameAds() {
  const AD_TAGS = [
    { kind: 'popunder', src: 'https://al5sm.com/tag.min.js', zone: '11057410' },
    { kind: 'vignette', src: 'https://n6wxm.com/vignette.min.js', zone: '11057419' },
  ];

  let injectedAds = false;

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
