//import c from '@aero/centra';
import { html } from 'lit-html';

export const newRedirect = (data) => {
    console.log("executing new redirect");
};


export const buttonTemplate = () => html`
<div> 
    <button class="redirect" id="redirect"> 
        Add Redirect 
    </button> 
    <button class="paste" id="paste">
        New Paste
    </button>
</div>`

export const errorTemplate = (errormsg) => html`
<div> 
    <p>
        ${errormsg}
    </p> 
</div>`