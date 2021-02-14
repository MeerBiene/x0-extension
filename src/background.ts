console.log('hey from the background');

import { newRedirect } from './util/util';
import StorageProvider from './util/StorageProvider';

chrome.runtime.onMessage.addListener(function (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: any,
  sender: unknown,
  sendResponse: unknown
) {
  console.log(request, sender, sendResponse);
  switch (request.action) {
    case 'REDIRECT':
      // TODO: send error if link doesnt start with http
      request.data.includes('http') ? newRedirect(request.data, '') : null;
      break;
  }
});

console.log('all', StorageProvider.getAll());
