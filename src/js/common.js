// Setup url redirects if manifest v3
// Initialize pendo with given parameters
// Note, if visitor or account are ommited, the default value will be used
export function initPendo(apiKey, visitor, account) {
  let manifestVersion = chrome.runtime.getManifest().manifest_version;

  // URL Redirects for manifest V3 to load local resources
  if (manifestVersion == 3) {
    let urlRedirects = {
      // In App Designer
      "https://app.pendo.io/in-app-designer/latest/plugin.js": `chrome-extension://${chrome.runtime.id}/agent/plugin.js`,
      "https://app.pendo.io/in-app-designer/latest/preloader.js": `chrome-extension://${chrome.runtime.id}/agent/preloader.js`,
      // Preview Mode
      "https://cdn.pendo.io/agent/releases/2.143.1/pendo.preview.min.js": `chrome-extension://${chrome.runtime.id}/agent/pendo.preview.min.js`,
    };

    // Overwrite appendChild method
    (function (appendChild) {
      Element.prototype.appendChild = newAppend;

      function newAppend() {
        // Check for appended iframe so appendChild can be overwritten there as well
        // Required for preview mode which is called in new iframe
        if (arguments[0]?.tagName === "IFRAME") {
          let pendoCallback = arguments[0].onload;
          arguments[0].onload = function () {
            if (this.contentDocument) {
              this.contentDocument.body.appendChild = newAppend;
              pendoCallback();
            }
          };
        }

        // Apply url directs if applicable
        if (urlRedirects[arguments[0].src]) {
          console.log(
            `Redirecting ${arguments[0].src} to ${
              urlRedirects[arguments[0].src]
            }`
          );
          arguments[0].src = urlRedirects[arguments[0].src];
        }

        // Call original method
        appendChild.apply(this, arguments);
      }
    })(Element.prototype.appendChild);

    // Overwrite insertBefore method
    (function (insertBefore) {
      Node.prototype.insertBefore = function () {
        // Apply url directs if applicable
        if (urlRedirects[arguments[0].src]) {
          console.log(
            `Redirecting ${arguments[0].src} to ${
              urlRedirects[arguments[0].src]
            }`
          );
          arguments[0].src = urlRedirects[arguments[0].src];
        }

        // Call original method
        insertBefore.apply(this, arguments);
      };
    })(Node.prototype.insertBefore);
  }

  // Snippet to install Pendo
  // Note, call to get agentType is only for illustrative purposes to show how JSONP fails in manifest V3
  // In Manifest V2, the agent is loaded from the CDN as is normal
  // In Manifest V3, the agent must be self-hosted and is loaded from inside the chrome extension
  chrome.storage.sync.get(["agentType"], (data) => {
    (function (apiKey) {
      window._apiKey = apiKey;
      (function (p, e, n, d, o) {
        var v, w, x, y, z;
        o = p[d] = p[d] || {};
        o._q = o._q || [];
        v = ["initialize", "identify", "updateOptions", "pageLoad", "track"];
        for (w = 0, x = v.length; w < x; ++w)
          (function (m) {
            o[m] =
              o[m] ||
              function () {
                o._q[m === v[0] ? "unshift" : "push"](
                  [m].concat([].slice.call(arguments, 0))
                );
              };
          })(v[w]);
        y = e.createElement(n);
        y.async = !0;
        y.src =
          manifestVersion === 2
            ? `https://cdn.pendo.io/agent/static/${apiKey}/pendo.js`
            : chrome.runtime.getURL(`agent/pendo.${data.agentType}.js`);
        z = e.getElementsByTagName(n)[0];
        z.parentNode.insertBefore(y, z);
      })(window, document, "script", "pendo");

      pendo.initialize({
        visitor: {
          id: visitor || "VISITOR-UNIQUE-ID",
        },
        account: {
          id: account || "ACCOUNT-UNIQUE-ID",
        },
      });
    })(apiKey);
  });
}
