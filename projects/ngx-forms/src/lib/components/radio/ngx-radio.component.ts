import {ChangeDetectionStrategy, Component, forwardRef, Injector, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormInputBase} from '../common/base.class';

@Component({
  selector: 'ngx-radio',
  templateUrl: 'ngx-radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgxRadioComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxRadioComponent extends FormInputBase {
  @Input() type = 'radio';
  constructor(public injector: Injector) {
    super(injector);
  }
}
