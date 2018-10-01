import {ChangeDetectionStrategy, Component, forwardRef, Injector, ViewChild} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormInputBase} from '../common/base.class';

@Component({
  selector: 'ngx-wysiwyg',
  templateUrl: 'ngx-wysiwyg.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgxWysiwygComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgxWysiwygComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'wysiwyg'
})

export class NgxWysiwygComponent extends FormInputBase {
  @ViewChild('editor') public editor: any;

  constructor(public injector: Injector) {
    super(injector);
  }
}
