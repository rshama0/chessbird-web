"use strict";

/**
 * Site-wide constants — single place for Play Store URL and analytics IDs.
 * Replace placeholder IDs before go-live.
 */
window.ChessBirdSite = Object.freeze({
  /**
   * Canonical Play Store listing with UTM for Play Console acquisition reports.
   * utm_source=website + utm_medium=organic + one shared campaign for chessbird.app.
   */
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.chessbird.app&utm_source=website&utm_medium=organic&utm_campaign=chessbird_web",
  /** Google Analytics 4 Measurement ID */
  ga4Id: "G-QDN11H52ZY",
  /** Hostnames where GA4 and Clarity may load (production only) */
  analyticsHosts: ["chessbird.app", "www.chessbird.app"],
  /** Microsoft Clarity project ID */
  clarityId: "",
  siteOrigin: "https://chessbird.app",
});

/**
 * Apply [ChessBirdSite.playStoreUrl] to every [data-play-store-link] anchor.
 * Keeps HTML markup DRY: change the URL once in this file.
 */
(function applyPlayStoreLinks() {
  function mount() {
    var url = window.ChessBirdSite && window.ChessBirdSite.playStoreUrl;
    if (!url) return;
    document.querySelectorAll("[data-play-store-link]").forEach(function (anchor) {
      anchor.setAttribute("href", url);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
