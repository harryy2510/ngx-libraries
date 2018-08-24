import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxRolesIfDirective} from './ngx-roles-if.directive';
import {NgxRolesService} from './ngx-roles.service';

@NgModule({
  declarations: [NgxRolesIfDirective],
  exports: [NgxRolesIfDirective]
})
export class NgxRolesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxRolesModule,
      providers: [NgxRolesService]
    };
  }
}
