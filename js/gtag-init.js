"use strict";

/**
 * Google Analytics 4 (gtag.js) — loads only on production hostnames with a valid measurement ID.
 * Must run synchronously in <head> immediately after js/site-config.js.
 */
(function () {
  var cfg = window.ChessBirdSite || {};
  var id = cfg.ga4Id || "";
  var hosts = cfg.analyticsHosts || ["chessbird.app", "www.chessbird.app"];
  var hostname = String(window.location.hostname || "").toLowerCase();

  window.ChessBirdAnalyticsState = {
    enabled: false,
    measurementId: id,
    hostname: hostname,
  };

  if (!id || id.indexOf("XXXX") !== -1) return;
  if (hosts.indexOf(hostname) === -1) return;

  window.ChessBirdAnalyticsState.enabled = true;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: true });
})();
