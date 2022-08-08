chrome.runtime.onInstalled.addListener(() => {
  console.clear();
  console.log("In background.js");

  // Only XHR will work with Manifest V3, but both are included to showcase how JSONP breaks
  chrome.storage.sync.set({ agentType: "xhr" });
});
