chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.contentScriptQuery) {
    case 'GET':
      const url = request.url;
      fetch(url)
        .then((response) => response.text())
        .then((response) => sendResponse(response))
        .catch();
      break;
    case 'POST':
      fetch(request.url, {
        method: 'POST',
        headers: {
          Accept:
            'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: 'result=' + request.data
      })
        .then((response) => response.json())
        .then((response) => sendResponse(response))
        .catch((error) => console.log('Error:', error));
      break;
  }
});
