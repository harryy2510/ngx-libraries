import {ChangeDetectionStrategy, Component, forwardRef, Injector} from '@angular/core';
import {FormInputBase} from '../common/base.class';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-date',
  templateUrl: 'ngx-date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgxDateComponent),
      multi: true
    }
  ],
  // viewProviders: [
  //   {
  //     provide: ControlContainer,
  //     useExisting: NgForm
  //   }
  // ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxDateComponent extends FormInputBase {
  constructor(public injector: Injector) {
    super(injector);
  }
}
