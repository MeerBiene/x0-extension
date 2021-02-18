const backbutton = document.createElement('button')
backbutton.innerHTML = '< Back'

const registerButton = document.createElement('button')
registerButton.innerText = 'Register and save new namespace'
registerButton.id = 'register'

const submitButton = document.createElement('button')
submitButton.innerText = 'Submit and save existing namespace'
submitButton.id = 'submit'

const showButton = document.createElement('button')
showButton.innerText = 'Show all saved namespaces'
showButton.id = 'show'


backbutton.addEventListener('click', () => { 
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(registerButton)
    document.getElementById('root').appendChild(submitButton)
    document.getElementById('root').appendChild(showButton)
})


registerButton.addEventListener('click', () => {
// TODO: register function for options page
});

submitButton.addEventListener('click', () => {
// TODO: submitfunction for options page
});

showButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        message: {
            action: 'get_namespaces_in_storage'
        }
    })

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message.action !== 'get_namespaces_in_storage') return;
        const list = document.createElement('ul')
        for (key in request.message.data) {
            list.innerHTML = `<li>${key}</li>`
        }
        document.getElementById('root').innerHTML = '';
        document.getElementById('root').appendChild(list)
        document.getElementById('root').appendChild(backbutton)
    });

});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('root').appendChild(registerButton)
    document.getElementById('root').appendChild(submitButton)
    document.getElementById('root').appendChild(showButton)
})