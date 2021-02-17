import {
  selectNameSpaceTemplate,
  registerOrSubmitTemplate
} from './util/templates';
import submitListener from './util/listeners/submitListener';
import StorageProvider from './util/StorageProvider';

const init = async () => {
  document
    .getElementById('redirect')
    .addEventListener('click', redirectEventListener);

  // chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
  //   const all = StorageProvider.getAll();
  //   const currentUrl = tabs[0].url;
  //   newRedirect(currentUrl, all.data);
  // });
};

const redirectEventListener = () => {
  const storage = new StorageProvider();
  const all = storage.all;
  console.log(all);
  if (all) {
    // no namespace registered,show submit or register template
    document.getElementById('root').innerHTML = registerOrSubmitTemplate();
    document.getElementById('submit').addEventListener('click', submitListener);
    return;
  }
  if (Object.keys(all).length > 1) {
    // more than one namespace, show select template
    document.getElementById('root').innerHTML = selectNameSpaceTemplate();
  } else if (Object.keys(all).length == 1) {
    // execute redirect directly with the one namespace
  }
};

// wait for the html document inside the popup to load
document.addEventListener('DOMContentLoaded', init);
