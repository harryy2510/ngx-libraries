import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxRightsIf} from './ngx-rights-if.directive';
import {NgxRightsService} from './ngx-rights.service';

@NgModule({
  declarations: [NgxRightsIf],
  exports: [NgxRightsIf]
})
export class NgxRightsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxRightsModule,
      providers: [NgxRightsService]
    };
  }
}

