import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Role} from './protos/appointy.go.roles.service';

@Injectable()
export class NgxRolesService {

  private _role: Role;
  public role$: BehaviorSubject<Role> = new BehaviorSubject<Role>(this._role);

  get role(): Role {
    return this._role;
  }

  set role(role: Role) {
    this._role = role;
    this.role$.next(this._role);
  }

  public check(_test: keyof Role | Array<keyof Role>) {
    let can = false;
    if (this.role) {
      if (_test instanceof Array) {
        _test.forEach(r => {
          if (this.role[r]) {
            can = true;
          }
        })
      } else if (typeof _test === 'string') {
        if (this.role[_test]) {
          can = true;
        }
      }
    }
    return can;
  }
}

