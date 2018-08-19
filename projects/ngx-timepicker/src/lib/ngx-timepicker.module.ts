import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgxTimepickerDirective} from './ngx-timepicker.directive';
import {TimepickerConfig} from './ngx-timepicker.service';


export const TIMEPICKER_CONFIG = new InjectionToken('Timepicker Config');

export function defaultsFactory(config) {
  return {...new TimepickerConfig(), ...config};
}

@NgModule({
  imports: [FormsModule],
  declarations: [NgxTimepickerDirective],
  exports: [NgxTimepickerDirective]
})
export class NgxTimepickerModule {
  static forRoot(config: TimepickerConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxTimepickerModule,
      providers: [
        {
          provide: TIMEPICKER_CONFIG,
          useValue: config
        },
        {
          provide: TimepickerConfig,
          useFactory: defaultsFactory,
          deps: [TIMEPICKER_CONFIG]
        }
      ]
    };
  }
}

