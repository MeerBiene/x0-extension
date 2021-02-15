import { newRedirect } from './util/util';
import StorageProvider from './util/StorageProvider';
// import { render } from 'lit-html';

// wait for the html document inside the popup to load
document.addEventListener(
  'DOMContentLoaded',
  function () {
    const a = async () => {
      document.getElementById('root').innerHTML = `
      <button id="redirect">New Redirect</button>`;
      console.log('yay');
      // initialize Storageprovider
      StorageProvider.getAll();

      document
        .getElementById('redirect')
        .addEventListener('click', async () => {
          console.log(this);
          await StorageProvider.getAll();
          const all = await StorageProvider.getAll();
          console.log(all);
          if (!all.data) return;
          let output = '';
          for (let i = 0; i < all.data.length; i++) {
            output += `<option value="${all.data[i]}">${all.data[i]}</option>`;
          }
          output = `<select id='namespaces'>${output}</select>`;
          document.getElementById('root').innerHTML = output;
        });

      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        const all = StorageProvider.getAll();
        const currentUrl = tabs[0].url;
        console.log(currentUrl);
        if (all.data) {
          if (Object.keys(all.data).length > 1) {
            // show select input with namespaces
            // render(
            //   selectTemplate(Object.keys(all.data), 'namespaces', () => {
            //     console.log(document.getElementById('namespaces'));
            //   }),
            //   document.body
            // );
          }
        }
        newRedirect(currentUrl, all.data);
      });
    };
    a();
    // render(buttonTemplate(a), document.body);
  },
  false
);
