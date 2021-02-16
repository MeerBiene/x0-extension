// Idea: use this just for displaying error messages
// Update: Idea was bad, doenst work
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender, sendResponse);
  switch (request.action) {
    case 'ERROR':
      // handle and display error here
      break;
  }
});
