import {ChangeDetectionStrategy, Component, forwardRef, Injector} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormInputBase} from '../common/base.class';

@Component({
  selector: 'ngx-input',
  templateUrl: 'ngx-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxInputComponent extends FormInputBase {
  constructor(public injector: Injector) {
    super(injector);
  }
}
