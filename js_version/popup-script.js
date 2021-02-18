document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.createElement('button');
    redirectButton.innerText = 'New Redirect';
    redirectButton.id = 'redirect';

    document.getElementById('root').appendChild(redirectButton);

    redirectButton.addEventListener('click', () => {
        console.log('redirect clicked');
        chrome.runtime.sendMessage({ message: { action: 'get_namespaces_in_storage' } });
    })

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("received from backend: ", request);
        if (request.message.action === 'get_namespaces_in_storage') {
            console.log("items in storage: ", request.message.data);
            chrome.runtime.onMessage.removeListener();
            console.log(Object.entries(request.message.data).length)
            if (Object.entries(request.message.data).length < 1) {
                console.log("no namespaces registered");
            }
        }
    });

});