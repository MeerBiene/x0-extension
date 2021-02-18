let active_tab_id = 0
chrome.tabs.onActivated.addListener((tab) => {
  console.log(tab)
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    active_tab_id = tab.tabId
    console.log(current_tab_info.url)
    if (!current_tab_info.url.startsWith('http')) return
    // chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('Background injected'))
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  if (request.message.action === 'get_namespaces_in_storage') {
    chrome.storage.local.get('namespaces', (value) => {

      let data = value
      if (value.namespaces) data = value.namespaces
      

      chrome.runtime.sendMessage({
        message: {
          action: 'get_namespaces_in_storage',
          data
        }
      })
    })
  } else if (request.message.action === 'set_namespace_to_storage') {
    const { key } = request.message.data
    chrome.storage.local.get('namespaces', (items) => {
      if (!items.namespaces) {
        const temp = { namespaces: {} }
        temp.namespaces[key] = request.message.data.value
        chrome.storage.local.set(temp)
      }

      items.namespaces[key] = request.message.data.value

      chrome.storage.local.set(items, () => {
        console.log('success')
      })
    })
  }
})
