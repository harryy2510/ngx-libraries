import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';

export class ScriptModel {
  name: string;
  src: string;
  loaded?: boolean;

  constructor(name, src) {
    this.name = name;
    this.src = src;
    this.loaded = false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NgxScriptLoaderService {

  private scripts: ScriptModel[] = [];

  public load(name: string, src: string): Observable<ScriptModel> {
    const script = new ScriptModel(name, src);
    return new Observable<ScriptModel>((observer: Observer<ScriptModel>) => {
      const existingScript = this.scripts.find(s => s.name === script.name);
      if (existingScript && existingScript.loaded) {
        observer.next(existingScript);
        observer.complete();
        return;
      }
      if (existingScript && !existingScript.loaded) {
        return;
      }
      this.scripts = [...this.scripts, script];
      let el = document.createElement('script');
      el.type = 'text/javascript';
      el.src = script.src;
      if (window['nonce']) {
        el.setAttribute('nonce', window['nonce']);
      }
      el.onload = () => {
        script.loaded = true;
        this.scripts = this.scripts.map(s => {
          if (s.name === script.name) {
            return script;
          }
          return s;
        });
        observer.next(script);
        observer.complete();
      };

      el.onerror = (error: any) => {
        this.scripts = this.scripts.filter(s => s.name !== script.name);
        observer.error(error);
      };

      document.getElementsByTagName('body')[0].appendChild(el);
    });
  }
}
