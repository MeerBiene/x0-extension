let active_tab_id = 0;
chrome.tabs.onActivated.addListener(tab => {
    console.log(tab)
    chrome.tabs.get(tab.tabId, current_tab_info => {
        active_tab_id = tab.tabId;
        console.log(current_tab_info.url)
        if (!current_tab_info.url.startsWith('http')) return;
        chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('Background injected'))
    })
})


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message.action) {
        case 'get_namespaces_in_storage':
            chrome.storage.local.get('namespaces', value => {
                console.log(value);
                
                chrome.runtime.sendMessage({
                    message: {
                        action: 'get_namespaces_in_storage',
                        data: value
                    }
                });
            })
            break;
    }
}) 