import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild, ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output, QueryList,
  Self,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {NgSelectComponent} from '@ng-select/ng-select';
import {AddTagFn, CompareWithFn, DropdownPosition} from '@ng-select/ng-select/ng-select/ng-select.component';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'ngx-mat-select',
  templateUrl: './ngx-mat-select.component.html',
  styleUrls: ['./ngx-mat-select.component.scss'],
  providers: [
    {provide: MatFormFieldControl, useExisting: NgxMatSelectComponent}
  ]
})
export class NgxMatSelectComponent<T> implements AfterViewInit, OnDestroy, OnChanges, MatFormFieldControl<any>, ControlValueAccessor {

  static nextId = 0;
  readonly stateChanges = new Subject<void>();
  focused = false;
  controlType = 'ngx-mat-select';
  @HostBinding() id = `${this.controlType}-${NgxMatSelectComponent.nextId++}`;
  @HostBinding('attr.aria-describedBy') describedBy = '';
  propogateChange = (_: any) => {
  } // tslint:disable-line
  propogateTouched = () => {
  } // tslint:disable-line
  @ViewChild(NgSelectComponent) select: NgSelectComponent;

  // inputs
  @Input() items: T[] = [];
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() clearable = true;
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
  @Input() virtualScroll: boolean;
  @Input() selectableGroup: boolean;
  @Input() selectableGroupAsModel: boolean;
  @Input() searchFn: Function;
  @Input() clearOnBackspace = false;
  @Input() typeahead: Subject<string>;
  @Input() multiple: boolean;
  @Input() addTag: boolean | AddTagFn;
  @Input() isOpen: boolean;
  @Input() searchable = true;
  @Input() compareWith: CompareWithFn;
  @Input() clearSearchOnAdd: boolean;

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
  @ContentChild('labelTemplate', { read: TemplateRef }) labelTemplateRef: TemplateRef<any>;
  @ContentChild('multiLabelTemplate', { read: TemplateRef }) multiLabelTemplateRef: TemplateRef<any>;
  @ContentChild('optionTemplate', { read: TemplateRef }) optionTemplateRef: TemplateRef<any>;
  @ContentChild('optgroupTemplate', { read: TemplateRef }) optgroupTemplateRef: TemplateRef<any>;
  @ContentChild('headerTemplate', { read: TemplateRef }) headerTemplateRef: TemplateRef<any>;
  @ContentChild('footerTemplate', { read: TemplateRef }) footerTemplateRef: TemplateRef<any>;
  @ContentChild('typetosearchTemplate', { read: TemplateRef }) typetosearchTemplateRef: TemplateRef<any>;
  @ContentChild('notfoundTemplate', { read: TemplateRef }) notfoundTemplateRef: TemplateRef<any>;
  @ContentChild('loadingtextTemplate', { read: TemplateRef }) loadingtextTemplateRef: TemplateRef<any>;
  @ContentChild('tagTemplate', { read: TemplateRef }) tagTemplateRef: TemplateRef<any>;

  pluralMapping = {
    other: {
      '=0': '',
      '=1': '(+# other)',
      'other': '(+# others)'
    }
  };

  @ViewChild('templatePortal') templatePortal: TemplateRef<any>;
  overlayRef: OverlayRef;

  constructor(private viewContainerRef: ViewContainerRef,
              private fm: FocusMonitor,
              private cdRef: ChangeDetectorRef,
              @Optional() @Self() public ngControl: NgControl,
              private overlay: Overlay) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  _value: T | T[] | undefined = undefined;

  @Input()
  get value(): T | T[] | undefined {
    return this._value;
  }

  set value(value: T | T[] | undefined) {
    this.writeValue(value);
    this.propogateChange(value);
  }

  get errorState() {
    return this.ngControl.errors !== null && this.ngControl.touched;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  private _required = false;

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get disabled() {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);

    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }

  private _placeholder = '';

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return this.select ? !this.select.hasValue : true;
  }

  detectChanges() {
    if (!this.cdRef['destroyed']) {
      this.cdRef.markForCheck();
    }
  }

  ngAfterViewInit() {
    if (this.select && this.select.element) {
      this.fm.monitor(this.select.element, true).subscribe(origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    if (this.select && this.select.element) {
      this.fm.stopMonitoring(this.select.element);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stateChanges.next();
  }

  writeValue(value: T | T[] | undefined): void {
    this._value = value || undefined;
    setTimeout(() => {
      this.stateChanges.next();
      this.detectChanges();
    });
  }

  registerOnChange(fn: (_: any) => void): void {
    this.propogateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propogateTouched = fn;
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  focus(): void {
    if (this.select) {
      this.select.focus();
      this.select.open();
    }
  }

  onContainerClick() {
    if (!this.focused) {
      this.focus();
    }
  }

  onFocus(event) {
    if (this.items.length) {
      this.open();
    }
    this.focused = true;
    this.propogateTouched();
    this.stateChanges.next();
    this.focusEvent.emit(event);
  }

  @HostListener('focusout', ['$event'])
  onBlur(event) {
    if (this.select) {
      this.select.close();
    }
    this.focused = false;
    this.propogateTouched();
    this.stateChanges.next();
    this.blurEvent.emit(event);
    this.removeOverlay();
  }

  onOpen(event) {
    this.createOverlay();
    this.openEvent.emit(event);
  }

  open() {
    if (this.select && !this.select.isOpen) {
      this.select.open();
    }
  }

  close() {
    if (this.select && this.select.isOpen) {
      this.select.close();
    }
  }

  onClose(event) {
    this.removeOverlay();
    this.closeEvent.emit(event)
  }

  createOverlay() {
    const portalHost = new TemplatePortal(this.templatePortal, this.viewContainerRef);
    let config = new OverlayConfig();
    config.positionStrategy = this.overlay
      .position()
      .global();
    config.scrollStrategy = this.overlay.scrollStrategies.block();
    this.overlayRef = this.overlay.create(config);
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
      this.removeOverlay();
    });
    this.overlayRef.attach(portalHost);
  }

  removeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  emitChange($event) {
    this.writeValue(this.value);
    this.propogateChange(this.value);
    this.changeEvent.emit($event);
  }
}
