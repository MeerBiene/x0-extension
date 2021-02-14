//import c from '@aero/centra';
import { html, TemplateResult } from 'lit-html';
import StorageProvider from './StorageProvider';

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
  return html`<select>
      id=${selectId} class=${selectId}
      ${options.map(
        (option) => html`<option value="${option}">${option}</option>`
      )}
    </select>
    <button @click=${clickHandler}>Submit</button> `;
};

export const errorTemplate = (errormsg: string): TemplateResult => html` <div>
  <p>${errormsg}</p>
</div>`;
