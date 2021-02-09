import { buttonTemplate, errorTemplate } from './util/util';
import { render } from 'lit-html';

// list current namespaces
chrome.storage.sync.get(['namespaces'], (items: { [ key:string ]: string }) => {
    console.log(Object.entries(items).length);
    Object.keys(items.namespaces).length > 0 ? render(buttonTemplate(), document.body) : render(errorTemplate("Not registered"), document.body);
})


//!FIXME
// wait for the html document inside the popup to load
document.addEventListener('DOMContentLoaded', function () {





    document.getElementById('redirect').addEventListener('click', onclick, false)
    
    function onclick () {
    // query and select active tab
        chrome.tabs.query({ currentWindow: true, active: true },
            function(tabs) {
                console.log(tabs)

                const currentUrl = tabs[0].url


                
                chrome.runtime.sendMessage({
                    "action": "REDIRECT",
                    "data": currentUrl
                })
                
            }
        )
    }

}, false)