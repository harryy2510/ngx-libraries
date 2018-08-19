import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgxFlatpickrDirective} from './ngx-flatpickr.directive';
import {FlatpickrConfig} from './ngx-flatpickr.service';

export const FLATPICKR_CONFIG = new InjectionToken('Flatpickr Config');

export function defaultsFactory(config) {
  return {...new FlatpickrConfig(), ...config};
}

@NgModule({
  imports: [FormsModule],
  declarations: [NgxFlatpickrDirective],
  exports: [NgxFlatpickrDirective]
})
export class NgxFlatpickrModule {
  static forRoot(config: FlatpickrConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxFlatpickrModule,
      providers: [
        {
          provide: FLATPICKR_CONFIG,
          useValue: config
        },
        {
          provide: FlatpickrConfig,
          useFactory: defaultsFactory,
          deps: [FLATPICKR_CONFIG]
        }
      ]
    };
  }
}
