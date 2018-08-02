import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

import * as mm_ from 'multimatch';

const mm = mm_;

@Injectable()
export class NgxRightsService {

  private _rights: string | string[];
  private rights$: BehaviorSubject<string | string[]> = new BehaviorSubject<string | string[]>(this._rights);
  public rights: Observable<string | string[]> = this.rights$.asObservable().pipe(distinctUntilChanged());

  setRights(rights: string | string[]): void {
    this._rights = rights;
    this.rights$.next(this._rights);
  }

  public check(_test: string | string[]) {
    let can = false;
    if (this._rights && this._rights.length && _test) {
      can = !!mm(_test, this._rights, {nobrace: true}).length;
    }
    return can;
  }
}

