"use strict";

/**
 * Contact email — local part and domain stored separately; assembled at runtime.
 * No complete address string appears in HTML source.
 */
(function () {
  var emailLocal = "hello";
  var emailDomain = "chessbird.app";
  var formSubmitEndpoint = "52613ce9870c3c4726334145d5e3e79a";

  function fullAddress() {
    return emailLocal + "@" + emailDomain;
  }

  function mountEmailLink(anchor) {
    var email = fullAddress();
    anchor.href = "mailto:" + email;
    anchor.textContent = email;
  }

  function mountFormSubmitForm(form) {
    form.action = "https://formsubmit.co/" + formSubmitEndpoint;
  }

  function injectOrganizationSchemaEmail() {
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(function (script) {
      var data;
      try {
        data = JSON.parse(script.textContent);
      } catch (_err) {
        return;
      }
      var graph = data["@graph"];
      if (!Array.isArray(graph)) return;

      var changed = false;
      graph.forEach(function (node) {
        if (node["@type"] === "Organization" && node.contactPoint && typeof node.contactPoint === "object") {
          node.contactPoint.email = fullAddress();
          changed = true;
        }
      });

      if (changed) {
        script.textContent = JSON.stringify(data);
      }
    });
  }

  function boot() {
    document.querySelectorAll("[data-contact-email]").forEach(mountEmailLink);
    var form = document.querySelector("[data-formsubmit-contact]");
    if (form) mountFormSubmitForm(form);
    injectOrganizationSchemaEmail();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
