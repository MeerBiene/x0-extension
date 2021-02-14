import { buttonTemplate, newRedirect, selectTemplate } from './util/util';
import StorageProvider from './util/StorageProvider';
import { render } from 'lit-html';

// wait for the html document inside the popup to load
document.addEventListener(
  'DOMContentLoaded',
  function () {
    render(buttonTemplate(), document.body);
    document.getElementById('redirect').addEventListener('click', async () => {
      console.log('yay');
      // initialize Storageprovider
      StorageProvider.getAll();

      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        const all = StorageProvider.getAll();
        const currentUrl = tabs[0].url;
        console.log(currentUrl);
        if (all.data) {
          if (Object.keys(all.data).length > 1) {
            // show select input with namespaces
            render(
              selectTemplate(Object.keys(all.data), 'namespaces'),
              document.body
            );
          }
        }
        newRedirect(currentUrl, all.data);
      });
    });
    //     // query and select active tab
    //     chrome.tabs.query(
    //       { currentWindow: true, active: true },
    //       function (tabs) {
    //         const currentUrl = tabs[0].url;
    //         chrome.runtime.sendMessage({
    //           action: 'REDIRECT',
    //           data: currentUrl
    //         });
    //       }
    //     );
    //   },
    //   false
    // );
  },
  false
);
