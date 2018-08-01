import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgxFlatpickrDirective} from './ngx-flatpickr.directive';
import {FlatpickrDefaults, IFlatpickrConfig} from './ngx-flatpickr.service';

export const FLATPICKR_CONFIG = new InjectionToken('Flatpickr Config');

export function defaultsFactory(config) {
  return {...new FlatpickrDefaults(), ...config};
}

@NgModule({
  imports: [FormsModule],
  declarations: [NgxFlatpickrDirective],
  exports: [NgxFlatpickrDirective]
})
export class NgxFlatpickrModule {
  static forRoot(config: IFlatpickrConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxFlatpickrModule,
      providers: [
        {
          provide: FLATPICKR_CONFIG,
          useValue: config
        },
        {
          provide: FlatpickrDefaults,
          useFactory: defaultsFactory,
          deps: [FLATPICKR_CONFIG]
        }
      ]
    };
  }
}
