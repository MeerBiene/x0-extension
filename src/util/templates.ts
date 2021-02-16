//import c from '@aero/centra';
import StorageProvider from './StorageProvider';

export const selectNameSpaceTemplate = (): string => {
  const allNamespaces = StorageProvider.getAll();
  if (!allNamespaces.data) return;
  let output = '';
  Object.keys(allNamespaces.data).forEach((key) => {
    output += `<option value="${key}">${key}</option>`;
  });
  return `<select id='namespaces'>${output}</select>`;
};

export const registerOrSubmitTemplate = (): string => {
  return `
  <h4>It seems as if you have no namespaces saved yet. Register one now or submit an already existing one.</h4>
  <button id="register" class="btn-register">Register New</button>
  <div id="grid">
    <input type="text" placeholder="Submit Existing" class="submit" id="submit">
    <button>Enter</button>
  </div>
  `;
};

export const newRedirect = async (
  data: string,
  token: string
): Promise<void> => {
  console.log('executing new redirect', data);
  const allTokens = await StorageProvider.getAll();
  console.log(allTokens, token);
  if (Object.keys(allTokens).length < 1) {
    return;
  }

  return;
};
