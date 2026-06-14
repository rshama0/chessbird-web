"use strict";

(function () {
  var cfg = window.ChessBirdSite || {};
  var join = document.getElementById("early-access-join-link");
  var install = document.getElementById("early-access-install-link");
  var feedback = document.getElementById("early-access-feedback-link");
  if (join && cfg.earlyAccessGoogleGroupUrl) join.href = cfg.earlyAccessGoogleGroupUrl;
  if (install && cfg.earlyAccessPlayStoreTestingUrl) install.href = cfg.earlyAccessPlayStoreTestingUrl;
  if (feedback && cfg.earlyAccessFeedbackFormUrl) feedback.href = cfg.earlyAccessFeedbackFormUrl;
})();
