import returnObject from '../@types/returnObject';
class StorageProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  all: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: any;
  static getAll(): returnObject {
    const returnobject: returnObject = {};
    chrome.storage.sync.get(
      ['namespaces'],
      (items: { [key: string]: string }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        returnobject.data = items.namespaces;
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

  constructor() {
    chrome.storage.sync.get(['namespaces'], (items) => {
      console.log(items);
      if (items) {
        this.all = items.namespaces;
      }
    });

    const get = () => {
      return this.all;
    };
    this.get = get;
  }
}

export default StorageProvider;
