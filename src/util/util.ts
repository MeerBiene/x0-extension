//import c from '@aero/centra';
import StorageProvider from './StorageProvider';

const styles = {
    backgroundColor: 'blue',
    color: 'white',
    width: '25',
    height: '35'
};

export const newRedirect = async (
    data: string,
    token: string
): Promise<TemplateResult> => {
    console.log('executing new redirect', data);
    const allTokens = await StorageProvider.getAll();
    console.log(allTokens, token);
    if (Object.keys(allTokens).length < 1) {
        return;
    }

    return;
};

export const buttonTemplate = (
    clickHandler: unknown
): TemplateResult => html` <div>
    <button class="redirect" id="redirect" @click=${clickHandler}>
        Add Redirect
    </button>
</div>`;

export const selectTemplate = (
    options: string[],
    selectId: string,
    clickHandler: unknown
): TemplateResult => {
    return html`<div style=${styleMap(styles)}>
        <select>
            id=${selectId} class=${selectId}
            ${options.map(
                (option) => html`<option value="${option}">${option}</option>`
    )}
        </select>
        <button @click=${clickHandler}>Submit</button>
    </div>`;
};

export const errorTemplate = (errormsg: string): TemplateResult => html` <div>
    <p>${errormsg}</p>
</div>`;
