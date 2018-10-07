import {ChangeDetectionStrategy, Component, forwardRef, Injector, Input} from '@angular/core';
import {ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';
import {FormInputBase} from '../common/base.class';

@Component({
  selector: 'ngx-switch',
  templateUrl: 'ngx-switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgxSwitchComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgxSwitchComponent),
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

export class NgxSwitchComponent extends FormInputBase {
  @Input() type = 'checkbox';

  constructor(public injector: Injector) {
    super(injector);
  }
}
