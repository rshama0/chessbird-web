"use strict";

/**
 * Site-wide constants — single place for Play Store URL and analytics IDs.
 * Replace placeholder IDs before go-live.
 */
window.ChessBirdSite = Object.freeze({
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.chessbird.app",
  /** Google Analytics 4 Measurement ID */
  ga4Id: "G-QDN11H52ZY",
  /** Hostnames where GA4 and Clarity may load (production only) */
  analyticsHosts: ["chessbird.app", "www.chessbird.app"],
  /** Microsoft Clarity project ID */
  clarityId: "",
  siteOrigin: "https://chessbird.app",
});
