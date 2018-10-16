import {ChangeDetectionStrategy, Component, forwardRef, Injector, OnInit} from '@angular/core';
import {ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';
import {FormInputBase} from '../common/base.class';

@Component({
  selector: 'ngx-select',
  templateUrl: 'ngx-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgxSelectComponent),
      multi: true
    }
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxSelectComponent extends FormInputBase implements OnInit {
  constructor(public injector: Injector) {
    super(injector);
  }

  filteredOptions: any[] = [];

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  filter(value: string) {
    this.filteredOptions = this.options.filter(o => o.title.trim().toLowerCase().includes(value.trim().toLowerCase()));
  }

  toggled(ev: any) {
    if (ev) {
      setTimeout(() => {
        document.getElementById('search').focus();
      });
    }
  }

}
