import {ChangeDetectionStrategy, Component, forwardRef, Injector} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormInputBase} from '../common/base.class';

@Component({
  selector: 'ngx-textarea',
  templateUrl: 'ngx-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgxTextAreaComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgxTextAreaComponent),
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

export class NgxTextAreaComponent extends FormInputBase {
  constructor(public injector: Injector) {
    super(injector);
  }
}
