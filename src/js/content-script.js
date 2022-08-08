console.log("In content-script.js");

// Add iframed content with Pendo installed for tracking
// Note that this iframe must be hosted by the chome extension.
// An iframe created directly in a third-party application will inherit that applications CSP headers, rather than those of the chrome extension.
const iframe = document.createElement("iframe");

iframe.src = chrome.runtime.getURL("html/iframe.html");
iframe.id = "pendo-on-chrome-extension-iframe";
iframe.style.position = "fixed";
iframe.style.bottom = "0px";
iframe.style.right = "0px";
iframe.style.width = "400px";
iframe.style.height = "400px";
iframe.style.border = "0px;";
iframe.style.zIndex = "99999";
iframe.style.backgroundColor = "white";

document.body.appendChild(iframe);
