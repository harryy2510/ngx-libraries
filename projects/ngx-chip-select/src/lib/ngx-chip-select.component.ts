import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import get from 'lodash.get';
import isequal from 'lodash.isequal';
import {SatPopover} from '@ncstate/sat-popover';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {coerceArray} from '@angular/cdk/coercion';
import {MatListOption, MatSelectionList} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

function id(): string {
  return 'axxxxxxxxxxx'.replace(/[x]/g, function (_) {
    const val = Math.random() * 16 | 0;
    return val.toString(16);
  });
}

export class NgxChipSelectOption {
  id: string;
  label: string;
  value: any;
  item: any;

  constructor(item: any, label: string, value: any) {
    this.id = item.id || id();
    this.label = label;
    this.value = value;
    this.item = item;
  }
}

@Component({
  selector: 'ngx-chip-select',
  templateUrl: 'ngx-chip-select.component.html',
  styleUrls: ['ngx-chip-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ngx-chip-select',
  },
})
export class NgxChipSelectComponent implements OnChanges, ControlValueAccessor, AfterContentInit {
  @Input() bindLabel: string = '';
  @Input() bindValue: string = '';
  @Input() disabled: boolean = false;
  @Input() clearable: boolean = false;
  @Output('change') changeEvent = new EventEmitter();
  options: NgxChipSelectOption[] = [];
  selectedOptions: NgxChipSelectOption[] = [];
  notSelectedOptions: NgxChipSelectOption[] = [];
  @ViewChild(SatPopover) popover: SatPopover;
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;
  initialized: boolean = false;
  private _initialValue: any[];
  private _selectionLabel: string = '';

  constructor(private _cdRef: ChangeDetectorRef,
              @Self()
              @Optional()
              private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get selectedLabel() {
    return this._selectionLabel || this.placeholder;
  }

  private _value: any;

  @Input()
  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  private _placeholder: string = 'Select';

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  private _items: any[] = [];

  @Input()
  get items(): any[] {
    return this._items;
  }

  set items(value: any[]) {
    this._items = value;
  }

  private _multiple: boolean = false;

  @Input()
  get multiple(): boolean {
    return this._multiple;
  }

  set multiple(value: boolean) {
    this._multiple = value;
    setTimeout(() => {
      if (this.multiple) {
        this.selectionList.selectedOptions = new SelectionModel<MatListOption>(this._multiple);
      } else if (Array.isArray(this.value)) {
        this.value = this.value[0];
        this._emitChange(true);
      }
    });
  }

  get isEmpty(): boolean {
    return !this.value || (Array.isArray(this.value) && !this.value.length);
  }

  get hasValue(): boolean {
    return !this.isEmpty;
  }

  ngAfterContentInit(): void {
    if (!this.multiple) {
      this.multiple = false;
    }
  }

  public markForCheck() {
    setTimeout(() => {
      if (!this._cdRef['destroyed']) {
        this._cdRef.markForCheck();
        this._cdRef.detectChanges();
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(_: any): void {
  }

  onTouched(): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.disabled) {
      this.popover.close();
    }
  }

  writeValue(value: any[]): void {
    if (value) {
      this._initialValue = value;
      this.initialized = false;
      this.initialize();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.options = [];
      this.items && this.items.forEach((item: any) => {
        this.options = [
          ...this.options,
          new NgxChipSelectOption(item, this.getLabel(item), this.getValue(item))
        ];
      });
      this.initialize();
    }
  }

  select(value: any) {
    if (!this.isSelected(value)) {
      this.value = this.multiple ? this.value = [...this.value, value] : value;
      this._emitChange(true);
      if (!this.multiple) {
        this.close();
      }
    }
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.popover.toggle();
  }

  open(): void {
    if (this.disabled) {
      return;
    }
    this.popover.open();
  }

  close(): void {
    this.popover.close();
  }

  clear(ev?: Event): void {
    if (ev) {
      ev.stopPropagation();
    }
    this.value = this.multiple ? [] : undefined;
    this._emitChange(true);
  }

  isSelected(value: any) {
    if (!this.multiple) {
      return isequal(this.value, value)
    }
    return !!(this.value && this.value.find(v => isequal(v, value)));
  }

  _emitChange(emit?: boolean): void {
    this.selectedOptions = this.options.filter((option: NgxChipSelectOption) => this.isSelected(option.value));
    this.notSelectedOptions = this.options.filter((option: NgxChipSelectOption) => !this.isSelected(option.value));
    this._parseSelectionLabel();
    this.onTouched();
    if (emit) {
      const items = this.selectedOptions.map((option: NgxChipSelectOption) => option.item);
      this.changeEvent.emit(this.multiple ? items : items[0]);
      this.onChange(this.value);
    }
  }

  private _parseSelectionLabel(): void {
    this._selectionLabel = '';
    const sLen = this.selectedOptions.length;
    const oLen = this.options.length;
    const nsLen = this.notSelectedOptions.length;
    if (sLen && oLen) {
      if (sLen === 1 && oLen === 1) {
        this._selectionLabel = this.selectedOptions[0].label;
      } else if (sLen === oLen) {
        this._selectionLabel = `All ${this.placeholder.toLowerCase()}`;
      } else if (sLen <= (oLen / 2)) {
        this._selectionLabel = `${this.selectedOptions[0].label} ${sLen > 1 ? '+' + (sLen - 1) : ''}`;
      } else {
        this._selectionLabel = `Exclude: ${this.notSelectedOptions[0].label} ${nsLen > 1 ? '+' + (nsLen - 1) : ''}`;
      }
    }
  }

  private initialize(): void {
    if (!this.initialized) {
      this.initialized = true;
      if (this._initialValue) {
        const initialValues = coerceArray(this._initialValue);
        if (this.multiple) {
          this.value = this.options
            .filter((option: NgxChipSelectOption) => initialValues.find(value => isequal(value, option.value)))
            .map((option: NgxChipSelectOption) => option.value);
        } else {
          const opt = this.options
            .find((option: NgxChipSelectOption) => initialValues.find(value => isequal(value, option.value)));
          if (opt) {
            this.value = opt.value;
          }
        }
        this._emitChange();
      }
      this.markForCheck();
    }
  }

  private getLabel(item: any): string {
    return this.bindLabel ? get(item, this.bindLabel) : item;
  }

  private getValue(item: any): any {
    return this.bindValue ? get(item, this.bindValue) : item;
  }
}
