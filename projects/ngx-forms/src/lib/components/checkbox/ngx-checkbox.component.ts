import {ChangeDetectionStrategy, Component, forwardRef, Injector, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormInputBase} from '../common/base.class';

@Component({
  selector: 'ngx-checkbox',
  templateUrl: 'ngx-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgxCheckboxComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxCheckboxComponent extends FormInputBase {
  @Input() type = 'checkbox';
  constructor(public injector: Injector) {
    super(injector);
  }
}
