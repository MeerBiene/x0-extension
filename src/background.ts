console.log("hey from the background")

import { newRedirect } from './util/index';


chrome.runtime.onMessage.addListener( function(request:any, sender:any, sendResponse:any) {
    console.log(request, sender)
    switch(request.action) {
        case "REDIRECT":
            request.data.includes("http") ? newRedirect(request.data) : null;
        break;
    }
})

chrome.storage.sync.set({
    'namespaces2': {
        'bene': 'testtoken'
    }
})

chrome.storage.sync.get(['namespaces', 'namespaces2'], async(items: { [key: string]:string }) => {
    
    console.log(items)

})