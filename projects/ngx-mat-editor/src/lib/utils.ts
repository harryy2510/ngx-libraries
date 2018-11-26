const id = 'tiny-script';
const url = 'assets/tinymce/tinymce.min.js';

export type callbackFn = () => void;

export interface IStateObj {
  listeners: callbackFn[];
  scriptId: string;
  scriptLoaded: boolean;
}

const injectScriptTag = (scriptId: string, callback: callbackFn) => {
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/javascript';
  scriptTag.id = scriptId;
  scriptTag.addEventListener('load', callback);
  scriptTag.src = url;
  if (document.head) {
    document.head.appendChild(scriptTag);
  }
};

export const create = (): IStateObj => {
  return {
    listeners: [],
    scriptId: uuid(id),
    scriptLoaded: false
  };
};

export const initializeTinyMCE = (state: IStateObj, callback: callbackFn) => {
  if (getTinymce() && state.scriptLoaded) {
    callback();
  } else {
    state.listeners.push(callback);
    if (!document.getElementById(state.scriptId)) {
      injectScriptTag(state.scriptId, () => {
        state.listeners.forEach((fn) => fn());
        state.scriptLoaded = true;
      });
    }
  }
};


export const getTinymce = () => {
  const w = typeof window !== 'undefined' ? (window as any) : undefined;
  return w && w.tinymce ? w.tinymce : null;
};

let unique = 0;

export const uuid = (prefix: string): string => {
  const date = new Date();
  const time = date.getTime();
  const random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
};
