import {
  newRedirect,
  selectNameSpaceTemplate,
  registerOrSubmitTemplate
} from './util/templates';
import StorageProvider from './util/StorageProvider';

// wait for the html document inside the popup to load
document.addEventListener(
  'DOMContentLoaded',
  function () {
    const a = async () => {
      document.getElementById('root').innerHTML = `
      <button id="redirect">New Redirect</button>`;

      document
        .getElementById('redirect')
        .addEventListener('click', async () => {
          const all = StorageProvider.getAll();
          if (!all.data) {
            // no namespace registered,show submit or register template
            document.getElementById(
              'root'
            ).innerHTML = registerOrSubmitTemplate();
            return;
          }
          if (Object.keys(all).length > 1) {
            // more than one namespace, show select template
            document.getElementById(
              'root'
            ).innerHTML = selectNameSpaceTemplate();
          } else if (Object.keys(all).length == 1) {
            // execute redirect directly with the one namespace
          }
        });

      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        const all = StorageProvider.getAll();
        const currentUrl = tabs[0].url;
        newRedirect(currentUrl, all.data);
      });
    };
    a();
    // render(buttonTemplate(a), document.body);
  },
  false
);
