import {
  ChangeDetectorRef,
  DoCheck,
  Injector,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NgForm} from '@angular/forms';

export const VALIDATION_TEXT = {
  min: ':field must be at least :value',
  gt: ':field must be greater than :value',
  gte: ':field must be greater than or equal :value',
  max: ':field must not be greater than :value',
  lt: ':field must be less than :value',
  lte: ':field must be less than or equal :value',
  range: ':field must be between :min and :max',
  digits: ':field must be digits only',
  number: ':field must be a number',
  url: ':field is not a valid url',
  email: ':field must be a valid email address',
  date: ':field is not a valid date',
  minDate: ':field must be after :value',
  minTime: ':field must be after :value',
  maxDate: ':field must be before :value',
  equal: ':field must be equal to :value',
  notEqual: ':field must not be equal to :value',
  equalTo: ':field must be equal to :value',
  notEqualTo: ':field must not be equal to :value',
  required: ':field is required',
  pattern: ':field format is invalid',
};

export function newId() {
  return 'axxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16));
}

export function checkType(input: any): String {
  if (!input) {
    return 'undefined';
  }

  if (typeof input === 'string') {
    return 'string';
  }

  if (Array.isArray(input)) {
    return 'array';
  }


  if (typeof input === 'object') {
    return 'object';
  }

  return 'undefined';
}


export function getValidator(validator: string, value?: string, message?: string): any {
  return {
    [validator]: {
      type: validator,
      value: value ? value : true,
      message: message ? message : VALIDATION_TEXT[validator]
    }
  }
}


export function parseValidators(validator: any) {
  let result: any = {};
  switch (checkType(validator)) {
    case 'string':
      result = {
        ...result,
        ...getValidator(validator)
      };
      break;
    case 'array':
      validator.forEach(v => {
        result = {
          ...result,
          ...parseValidators(v)
        };
      });
      break;
    case 'object':
      if (validator.type) {
        result = {
          ...result,
          ...getValidator(validator.type, validator.value, validator.message)
        };
      }
      break;
  }
  return result;
}

export abstract class FormInputBase implements ControlValueAccessor, OnChanges, DoCheck {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() dropdownPosition = 'bottom';
  @Input() inputId = newId();
  @Input() name = '';
  @Input() hint = '';

  @Input() bindLabel = 'title';
  @Input() bindValue: string = undefined;
  @Input() searchFn: any;
  @Input() minTime: any;
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() multiple: boolean;
  @Input() options: any[] = [];

  @Input() form: NgForm;

  @Input() validators: any;
  _validators: any = {};

  @Input() value: any;
  @Input() readonly = false;
  @Input() disabled = false;

  onChange = (_: any) => {
  };
  onTouched = () => {
  };
  public _ref: ChangeDetectorRef;
  private _formDiffer: KeyValueDiffer<string, any>;
  private _differs: KeyValueDiffers;

  constructor(public injector: Injector) {
    this._ref = injector.get(ChangeDetectorRef);
    this._differs = injector.get(KeyValueDiffers);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.validators) {
      this._validators = parseValidators(this.validators);
    }
    if (changes.form && this.form) {
      this._formDiffer = this._differs.find(this.form).create();
    }
    if (this.name) {
      this.label = this.label ? this.label : (this.placeholder ? '' : this.name);
    }
    this.markForCheck();
  }

  public ngDoCheck(): void {
    if (this.form && this._formDiffer.diff(this.form)) {
      this.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.markForCheck();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  emitChange() {
    this.onChange(this.value);
  }

  public markForCheck() {
    setTimeout(() => {
      if (!this._ref['destroyed']) {
        this._ref.markForCheck();
        this._ref.detectChanges();
      }
    });
  }

}
