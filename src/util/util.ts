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

export const buttonTemplate = (): TemplateResult => html` <div>
  <button class="redirect" id="redirect">Add Redirect</button>
  <script>
    function main() {
      console.log('Hello wolrd');
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log(tabs);

        const currentUrl = tabs[0].url;

        chrome.runtime.sendMessage({
          action: 'REDIRECT',
          data: currentUrl
        });
      });
    }
  </script>
</div>`;

export const selectTemplate = (
  options: string[],
  selectId: string
): TemplateResult => {
  let outputString = '';
  for (let i = 0; i < options.length; i++) {
    outputString += `
    <option value="${options[i]}">${options[i]}</option>
    `;
  }
  return html`
    <select id="${selectId}">
      ${outputString.replace('"', '')}
    </select>
  `;
};

export const errorTemplate = (errormsg: string): TemplateResult => html` <div>
  <p>${errormsg}</p>
</div>`;
