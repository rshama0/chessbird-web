"use strict";

/**
 * Analytics integration: GA4 custom events, Microsoft Clarity, and UI helpers.
 * GA4 loads via gtag-init.js (production only). Events no-op when analytics is disabled.
 */
(function () {
  var cfg = window.ChessBirdSite || {};
  var clarityId = cfg.clarityId || "";

  /** data-analytics attribute value → GA4 recommended event name */
  var CTA_EVENT_MAP = {
    footer_play_link: "play_store_click",
    hero_download: "play_store_click",
  };

  function isAnalyticsEnabled() {
    return !!(window.ChessBirdAnalyticsState && window.ChessBirdAnalyticsState.enabled);
  }

  function gtagSafe() {
    if (typeof window.gtag === "function") {
      window.gtag.apply(window, arguments);
    }
  }

  function track(eventName, params) {
    if (!isAnalyticsEnabled()) return;
    gtagSafe("event", eventName, params || {});
  }

  window.ChessBirdAnalytics = {
    enabled: isAnalyticsEnabled,
    track: track,
  };

  function buildCtaParams(el, label) {
    var href = el.getAttribute("href") || "";
    var placement = el.getAttribute("data-analytics-placement") || label;
    var eventName = CTA_EVENT_MAP[label];
    if (!eventName) return null;
    var params = {
      placement: placement,
      link_url: href,
    };
    if (eventName === "play_store_click") {
      params.link_url = href || cfg.playStoreUrl || "";
    }
    return { eventName: eventName, params: params };
  }

  /** CTA click tracking via data-analytics attributes */
  function initCtaTracking() {
    document.addEventListener("click", function (ev) {
      var el = ev.target.closest("[data-analytics]");
      if (!el) return;
      var label = el.getAttribute("data-analytics");
      if (!label) return;
      var built = buildCtaParams(el, label);
      if (!built) return;
      track(built.eventName, built.params);
    });
  }

  /** FAQ expand/collapse */
  function initFaqTracking() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        var question = item.querySelector(".faq-question");
        var text = question ? question.textContent.trim() : "unknown";
        track("faq_open", {
          question: text,
        });
      });
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("site-nav--open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("site-nav--open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  function loadClarity() {
    if (!isAnalyticsEnabled()) return;
    if (!clarityId || clarityId.indexOf("XXXX") !== -1) return;
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  }

  function boot() {
    initCtaTracking();
    initFaqTracking();
    initMobileNav();
    loadClarity();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
