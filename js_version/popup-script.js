const takeCareOfNameSpaceSelectionAndRegisterNewRedirect = (request) => {
    const labelforselect = document.createElement('h4')
    labelforselect.innerText = 'Pick what namespace to use';
    const customKey = document.createElement('input');
    customKey.id = 'customKey'
    customKey.placeholder = 'Enter a custom key'
    customKey.className = 'customKey'
    const enterbutton = document.createElement('button');
    enterbutton.innerHTML = 'Enter'
    enterbutton.className = 'btn-enter'
    const selectNamespace = document.createElement('select')
    selectNamespace.id = 'selectNamespace'
    selectNamespace.className = 'selectNamespace'
    for (const key in request.message.data) {
        selectNamespace.innerHTML += `<option>${key}</option>`
    }

    document.getElementById('root')
        .innerHTML = '';

    document.getElementById('root')
        .appendChild(labelforselect)
    document.getElementById('root')
        .appendChild(selectNamespace)
    document.getElementById('root')
        .appendChild(customKey)
    document.getElementById('root')
        .appendChild(enterbutton)

    enterbutton.addEventListener('click', () => {
        // selected namespace, key to get token
        const selected = document.getElementById('selectNamespace').value;
        if (selected == '') return;
        // if wantkey is defined, user wants a custom key
        const wantkey = document.getElementById('customKey').value


        chrome.tabs.query({ active: true }, async (tabs) => {
            const url = tabs[0].url;

            if (!url.startsWith("http")) return alert('You cant use urls that do not start with "https://"')

            let endpoint = endpoints.createNewRedirect.replace('%%namespace%%', selected)
            wantkey != '' ? endpoint = endpoint + '/' + wantkey : null;

            const result = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + request.message.data[selected]
                },
                body: JSON.stringify({ 'target': url })
            })

            const json = await result.json()

            if (json.messages) {
                // error occured, alert first message to user
                alert('The following error occured: \n\n' + json.messages[0].toString())
            } else if (json.namespace) {
                // redirect successfull, save link to user clipboard and send alert
                const text = `${endpoints.baseUrl}${json.namespace}/${json.key}`
                navigator.clipboard.writeText(text).then(() => {
                    // Async: Copying to clipboard was successful!'
                    document.getElementById('root').innerHTML = `
                    <div id="successMessage">
                        <h4>
                            Success! The new redirect was copied to your clipboard. In case that failed:
                                <a href="${text}">
                                    ${text}
                                </a>
                        </h4>
                    </div>`


                    const closebutton = document.createElement('button')
                    closebutton.innerText = 'X Close'


                    document.getElementById('root').appendChild(closebutton);

                    closebutton.addEventListener('click', () => {
                        document.getElementById('root').innerHTML = '';
                        document.getElementById('root').appendChild(redirectButton);
                        window.close();
                    })

                }, (err) => {
                    console.error('Async: Could not copy text: ', err);
                    alert(`An error occured when trying to copy to your clipboard. Heres the link: \n\n${text}}`)
                });
            }

        })


    })
};


const registerNewNameSpaceOrSubmitExisting = (request) => {
    const registerOrSubmit = document.createElement('select');
    registerOrSubmit.innerHTML = `
    <option>Register new namespace</option>
    <option>Submit existing namespace</option>`
    registerOrSubmit.id = 'registerselect'
    registerOrSubmit.className = 'registerselect'

    const submitButton = document.createElement('button')
    submitButton.innerText = 'Enter'
    submitButton.className = 'btn-submit'

    document.getElementById('root').innerHTML = `
    <h4>No namespace(s) found. Pick what to do next.</h4>`;
    document.getElementById('root').appendChild(registerOrSubmit)
    document.getElementById('root').appendChild(submitButton)

    submitButton.addEventListener('click', () => {
        const selected = document.getElementById('registerselect').value
        if (selected == '') return;
        if (selected.startsWith('Register')) {
            const requestedNamespace = document.createElement('input')
            requestedNamespace.placeholder = 'Enter your desired namespace'
            requestedNamespace.id = 'requestedNamespace'
            const submitRequested = document.createElement('button')
            submitRequested.innerText = 'Enter'
            document.getElementById('root').innerHTML = '';
            document.getElementById('root').appendChild(requestedNamespace)
            document.getElementById('root').appendChild(submitRequested)
            submitRequested.addEventListener('click', async () => {
                const desiredNamespace = document.getElementById('requestedNamespace').value;
                let url = endpoints.register.replace('%%namespace%%', desiredNamespace)
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                const json = await response.json();
                console.log('response_from_register', json)
                if (json.messages) {
                    // error occured
                } else if (json.id && json.token) {
                    // display token and save to storage
                    chrome.runtime.sendMessage({
                        message: {
                            action: 'set_namespace_to_storage',
                            data: {
                                key: json.id,
                                value: json.token
                            }
                        }
                    })
                }
            });
        } else if (selected.startsWith('Submit')) {
            chrome.storage.local.remove('namespaces')
        }
    });

};




document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.createElement('button');
    redirectButton.innerText = 'New Redirect';
    redirectButton.className = 'btn-redirect';
    redirectButton.id = 'redirect';

    document.getElementById('root').appendChild(redirectButton);

    redirectButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ message: { action: 'get_namespaces_in_storage' } });
    })

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message.action === 'get_namespaces_in_storage') {
            let amount_of_items_in_storage = Object.entries(request.message.data).length;
            if (amount_of_items_in_storage < 1) {
                // no namespaces, show register or submit prompt
                registerNewNameSpaceOrSubmitExisting(request)
            } else if (amount_of_items_in_storage >= 1) {
                // more than one namespace registered, show select
                takeCareOfNameSpaceSelectionAndRegisterNewRedirect(request)
            };
        }
    });

});