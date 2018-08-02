import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgxTimepickerDirective} from './ngx-timepicker.directive';
import {ITimepickerConfig, TimepickerDefaults} from './ngx-timepicker.service';


export const TIMEPICKER_CONFIG = new InjectionToken('Timepicker Config');

export function defaultsFactory(config) {
  return {...new TimepickerDefaults(), ...config};
}

@NgModule({
  imports: [FormsModule],
  declarations: [NgxTimepickerDirective],
  exports: [NgxTimepickerDirective]
})
export class NgxTimepickerModule {
  static forRoot(config: ITimepickerConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxTimepickerModule,
      providers: [
        {
          provide: TIMEPICKER_CONFIG,
          useValue: config
        },
        {
          provide: TimepickerDefaults,
          useFactory: defaultsFactory,
          deps: [TIMEPICKER_CONFIG]
        }
      ]
    };
  }
}

