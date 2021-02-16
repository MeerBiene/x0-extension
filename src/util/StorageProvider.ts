import returnObject from '../@types/returnObject';

const returnobject: returnObject = { error: false };

class StorageProvider {
  static getAll(): returnObject {
    chrome.storage.sync.get(
      ['namespaces'],
      (items: { [key: string]: string }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        returnobject.data = items.namespaces;
        return returnobject;
      }
    );
    return returnobject;
  }
  static set(key: string, value: string): void {
    chrome.storage.sync.get(['namespaces'], (items) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      items.namespaces[key] = value;
      chrome.storage.sync.set({ namespaces: items.namespaces });
    });
  }
}

export default StorageProvider;
