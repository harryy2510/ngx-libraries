import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Self,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {
  CanDisable,
  CanDisableCtor,
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  ErrorStateMatcher,
  HasTabIndex,
  HasTabIndexCtor,
  MatFormField,
  MatFormFieldControl,
  MatPrefix,
  MatSuffix,
  mixinDisabled,
  mixinDisableRipple,
  mixinErrorState,
  mixinTabIndex
} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {NgSelectComponent} from '@ng-select/ng-select';
import {AddTagFn, CompareWithFn, DropdownPosition} from '@ng-select/ng-select/ng-select/ng-select.component';
import {filter, map} from 'rxjs/operators';
import {Directionality} from '@angular/cdk/bidi';

let nextUniqueId = 0;

export class MatSelectBase {
  constructor(public _elementRef: ElementRef,
              public _defaultErrorStateMatcher: ErrorStateMatcher,
              public _parentForm: NgForm,
              public _parentFormGroup: FormGroupDirective,
              public ngControl: NgControl) {
  }
}

export const _MatSelectMixinBase:
  CanDisableCtor &
  HasTabIndexCtor &
  CanUpdateErrorStateCtor &
  typeof MatSelectBase =
    mixinTabIndex(mixinDisabled(mixinErrorState(MatSelectBase)));


@Component({
  selector: 'ngx-mat-select',
  exportAs: 'ngxMatSelect',
  templateUrl: './ngx-mat-select.component.html',
  styleUrls: ['./ngx-mat-select.component.scss'],
  providers: [
    {provide: MatFormFieldControl, useExisting: NgxMatSelectComponent}
  ],
  inputs: ['disabled', 'tabIndex'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.tabindex]': 'tabIndex',
    // '[attr.aria-label]': '_getAriaLabel()',
    // '[attr.aria-labelledby]': '_getAriaLabelledby()',
    // '[attr.aria-required]': 'required.toString()',
    // '[attr.aria-disabled]': 'disabled.toString()',
    // '[attr.aria-invalid]': 'errorState',
    // '[attr.aria-owns]': 'isOpen ? _optionIds : null',
    // '[attr.aria-multiselectable]': 'multiple',
    // '[attr.aria-describedby]': '_ariaDescribedby || null',
    // '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
    '[class.ngx-mat-select-disabled]': 'disabled',
    '[class.ngx-mat-select-invalid]': 'errorState',
    '[class.ngx-mat-select-required]': 'required',
    '[class.ngx-mat-select-empty]': 'empty',
    'class': 'ngx-mat-select',
  }
})
export class NgxMatSelectComponent<T> extends _MatSelectMixinBase implements OnChanges,
  OnDestroy, DoCheck, ControlValueAccessor, CanDisable, HasTabIndex,
  MatFormFieldControl<any>, CanUpdateErrorState,
  AfterViewInit,
  OnDestroy, OnChanges, MatFormFieldControl<any>, ControlValueAccessor {

  /** The aria-describedby attribute on the select for improved a11y. */
  _ariaDescribedby: string;
  /** A name for this control that can be used by `mat-form-field`. */
  controlType = 'ngx-mat-select';
  /** Aria label of the select. If not specified, the placeholder will be used as label. */
  @Input('aria-label') ariaLabel: string = '';
  /** Input that can be used to specify the `aria-labelledby` attribute. */
  @Input('aria-labelledby') ariaLabelledby: string;
  /** Object used to control when error messages are shown. */
  @Input() errorStateMatcher: ErrorStateMatcher;
  /** Event emitted when the select panel has been toggled. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Event emitted when the select has been opened. */
  @Output('opened') readonly _openedStream: Observable<void> =
    this.openedChange.pipe(filter(o => o), map(() => {
    }));
  /** Event emitted when the select has been closed. */
  @Output('closed') readonly _closedStream: Observable<void> =
    this.openedChange.pipe(filter(o => !o), map(() => {
    }));
  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<T | T[]> =
    new EventEmitter<T | T[]>();
  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange: EventEmitter<T | T[]> = new EventEmitter<T | T[]>();
  @ViewChild(NgSelectComponent) select: NgSelectComponent;
  @Input() matPrefix: MatPrefix;
  @Input() matSuffix: MatSuffix;
  // inputs
  @Input() items: T[] = [];
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() clearable = false;
  @Input() markFirst = true;
  @Input() notFoundText = 'No results found';
  @Input() typeToSearchText = 'Type to search';
  @Input() addTagText = 'Add';
  @Input() loadingText = 'Loading...';
  @Input() clearAllText = 'Clear all';
  @Input() dropdownPosition: DropdownPosition = 'auto';
  @Input() appendTo = 'body';
  @Input() loading = false;
  @Input() closeOnSelect = true;
  @Input() hideSelected = false;
  @Input() selectOnTab = false;
  @Input() openOnEnter = true;
  @Input() maxSelectedItems: number;
  @Input() groupBy: string | Function;
  @Input() groupValue: Function;
  @Input() bufferAmount: number;
  @Input() virtualScroll = true;
  @Input() selectableGroup: boolean;
  @Input() selectableGroupAsModel: boolean;
  @Input() searchFn: Function;
  @Input() clearOnBackspace = false;
  @Input() typeahead: Subject<string>;
  @Input() addTag: boolean | AddTagFn;
  @Input() searchable = true;
  @Input() compareWith: CompareWithFn;
  @Input() clearSearchOnAdd = true;
  // output events
  @Output('blur') blurEvent = new EventEmitter();
  @Output('focus') focusEvent = new EventEmitter();
  @Output('change') changeEvent = new EventEmitter();
  @Output('open') openEvent = new EventEmitter();
  @Output('close') closeEvent = new EventEmitter();
  @Output('search') searchEvent = new EventEmitter();
  @Output('clear') clearEvent = new EventEmitter();
  @Output('add') addEvent = new EventEmitter();
  @Output('remove') removeEvent = new EventEmitter();
  @Output('scroll') scrollEvent = new EventEmitter<{ start: number; end: number }>();
  @Output('scrollToEnd') scrollToEndEvent = new EventEmitter<{ start: number; end: number }>();
  // template ref
  @ContentChild('labelTemplate', {read: TemplateRef}) labelTemplateRef: TemplateRef<any>;
  @ContentChild('multiLabelTemplate', {read: TemplateRef}) multiLabelTemplateRef: TemplateRef<any>;
  @ContentChild('optionTemplate', {read: TemplateRef}) optionTemplateRef: TemplateRef<any>;
  @ContentChild('optgroupTemplate', {read: TemplateRef}) optgroupTemplateRef: TemplateRef<any>;
  @ContentChild('headerTemplate', {read: TemplateRef}) headerTemplateRef: TemplateRef<any>;
  @ContentChild('footerTemplate', {read: TemplateRef}) footerTemplateRef: TemplateRef<any>;
  @ContentChild('typetosearchTemplate', {read: TemplateRef}) typetosearchTemplateRef: TemplateRef<any>;
  @ContentChild('notfoundTemplate', {read: TemplateRef}) notfoundTemplateRef: TemplateRef<any>;
  @ContentChild('loadingtextTemplate', {read: TemplateRef}) loadingtextTemplateRef: TemplateRef<any>;
  @ContentChild('tagTemplate', {read: TemplateRef}) tagTemplateRef: TemplateRef<any>;
  pluralMapping = {
    other: {
      '=0': '',
      '=1': '(+# other)',
      'other': '(+# others)'
    }
  };
  /** Unique id for this input. */
  private _uid = `ngx-mat-select-${nextUniqueId++}`;
  /** Emits whenever the component is destroyed. */
  private readonly _destroy = new Subject<void>();

  constructor(
    private fm: FocusMonitor,
    private _changeDetectorRef: ChangeDetectorRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    elementRef: ElementRef,
    @Optional() private _dir: Directionality,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() private _parentFormField: MatFormField,
    @Self() @Optional() public ngControl: NgControl,
    @Attribute('tabindex') tabIndex: string) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm,
      _parentFormGroup, ngControl);

    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    this.tabIndex = parseInt(tabIndex) || -1;

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  /** Whether or not the overlay panel is open. */
  private _isOpen = false;

  /** Whether or not the overlay panel is open. */
  get isOpen(): boolean {
    return this._isOpen;
  }

  /** Whether filling out the select is required in the form. */
  private _required: boolean = false;

  /** Whether the component is required. */
  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  /** The placeholder displayed in the trigger of the select. */
  private _placeholder: string;

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  /** Whether the component is in multiple selection mode. */
  private _multiple: boolean = false;

  /** Whether the user should be allowed to select multiple options. */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }

  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }

  private _focused = false;

  /** Whether the select is focused. */
  get focused(): boolean {
    return this._focused || this._isOpen;
  }

  private _value: T | T[];

  /** Value of the select control. */
  @Input()
  get value(): T | T[] {
    return this._value;
  }

  set value(newValue: T | T[]) {
    if (newValue !== this._value) {
      this.writeValue(newValue);
      this._value = newValue;
    }
  }

  private _id: string;

  /** Unique id of the element. */
  @Input()
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value || this._uid;
    this.stateChanges.next();
  }

  /** Whether the select has a value. */
  get empty(): boolean {
    return this.select ? !this.select.hasValue : true;
  }

  /**
   * Implemented as part of MatFormFieldControl.
   */
  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || this._isOpen || !this.empty;
  }

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => {
  };

  /** `View -> model callback called when select has been touched` */
  _onTouched = () => {
  };

  ngAfterViewInit() {
    if (this.select && this.select.element) {
      this.fm.monitor(this.select.element, true).subscribe(origin => {
        this._focused = !!origin;
        this.stateChanges.next();
      });
    }
  }

  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
    // the parent form field know to run change detection when the disabled state changes.
    if (changes.disabled) {
      this.stateChanges.next();
    }

    if (changes.multiple) {
      this.clearable = this.multiple;
      // this.closeOnSelect = !this.multiple && !!this.typeahead;
      this.stateChanges.next();
    }
    if (changes.typeahead) {
      this.clearOnBackspace = !!this.typeahead;
      // this.closeOnSelect = !this.multiple && !!this.typeahead;
      this.stateChanges.next();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this.stateChanges.complete();
    if (this.select && this.select.element) {
      this.fm.stopMonitoring(this.select.element);
    }
  }

  /** Toggles the overlay panel open or closed. */
  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this.disabled || !this.items || !this.items.length || this._isOpen) {
      return;
    }

    this._isOpen = true;
    setTimeout(() => {
      if (this.select && !this.select.isOpen) {
        this.select.focus();
        this.select.open();
      }
    });
    this.detectChanges();
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    if (this._isOpen) {
      this._isOpen = false;
      if (this.select && this.select.isOpen) {
        this.select.close();
      }
      this.detectChanges();
      this._onTouched();
    }
  }

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: T | T[]): void {
    if (this.items && this.items.length) {
      this._value = this.coerceValue(value);
    }
  }

  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  /** The currently selected option. */
  get selected(): T | T[] {
    return this.multiple ? (this.select && (this.select.selectedValues as T[])) || [] : this.select && (this.select.selectedValues[0] as T);
  }

  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.detectChanges();
    this.stateChanges.next();
  }

  /** Whether the element is in RTL mode. */
  _isRtl(): boolean {
    return this._dir ? this._dir.value === 'rtl' : false;
  }

  /** Focuses the select element. */
  focus(): void {
    if (this.select) {
      this.select.focus();
    }
  }

  /** Returns the aria-label of the select component. */
  _getAriaLabel(): string | null {
    // If an ariaLabelledby value has been set by the consumer, the select should not overwrite the
    // `aria-labelledby` value by setting the ariaLabel to the placeholder.
    return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
  }

  /** Returns the aria-labelledby of the select component. */
  _getAriaLabelledby(): string | null {
    if (this.ariaLabelledby) {
      return this.ariaLabelledby;
    }

    // Note: we use `_getAriaLabel` here, because we want to check whether there's a
    // computed label. `this.ariaLabel` is only the user-specified label.
    if (!this._parentFormField || !this._parentFormField._hasFloatingLabel() ||
      this._getAriaLabel()) {
      return null;
    }

    return this._parentFormField._labelId || null;
  }

  /**
   * Implemented as part of MatFormFieldControl.
   */
  setDescribedByIds(ids: string[]) {
    this._ariaDescribedby = ids.join(' ');
  }

  /**
   * Implemented as part of MatFormFieldControl.
   */
  onContainerClick() {
    if (!this.focused && !coerceBooleanProperty(this.matPrefix) && !coerceBooleanProperty(this.matSuffix)) {
      this.focus();
      this.open();
    }
  }

  _onFocus($event) {
    if (!this.disabled) {
      this._focused = true;
      this.stateChanges.next();
    }
    this.focusEvent.emit($event);
  }

  /**
   * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
   * "blur" to the panel when it opens, causing a false positive.
   */
  _onBlur($event) {
    this._focused = false;

    if (!this.disabled && !this.isOpen) {
      this._onTouched();
      this.detectChanges();
      this.stateChanges.next();
    }
    this.blurEvent.emit($event);
  }

  _onOpen($event) {
    this._isOpen = true;
    this.openedChange.emit(this._isOpen);
    this.openEvent.emit($event);
  }

  _onClose($event) {
    this._isOpen = false;
    this.openedChange.emit(this._isOpen);
    this.closeEvent.emit($event);
  }

  _onSearch($event) {
    this.searchEvent.emit($event);
    this.detectChanges()
  }

  _onClear($event) {
    this.clearEvent.emit($event);
    this.detectChanges()
  }

  _onAdd($event) {
    this.addEvent.emit($event);
    this.detectChanges()
  }

  _onRemove($event) {
    this.removeEvent.emit($event);
    this.detectChanges()
  }

  _onScroll($event) {
    this.scrollEvent.emit($event);
    this.detectChanges()
  }

  _onScrollToEnd($event) {
    this.scrollToEndEvent.emit($event);
    this.detectChanges()
  }

  detectChanges() {
    setTimeout(() => {
      if (!this._changeDetectorRef['destroyed']) {
        this._changeDetectorRef.markForCheck();
      }
      if (this.select) {
        this.select.detectChanges();
      }
    });
  }

  /** Emits change event to set the model value. */
  _propagateChanges($event): void {
    this.valueChange.emit(this.value);
    this._onChange(this.value);
    this.changeEvent.emit($event);
    this.detectChanges();
  }

  private coerceValue(value: T | T[]) {
    if (typeof value === 'undefined' || value === null || (typeof value === 'string' && value === '')) {
      return undefined;
    }
    return value;
  }
}
