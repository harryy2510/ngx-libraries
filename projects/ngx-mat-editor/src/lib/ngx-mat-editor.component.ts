import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs';
import {EventObj} from '@tinymce/tinymce-angular/editor/Events';
import * as Utils from './utils';

const scriptState = Utils.create();

@Component({
  selector: 'ngx-mat-editor',
  templateUrl: './ngx-mat-editor.component.html',
  styleUrls: ['./ngx-mat-editor.component.scss'],
  providers: [
    {provide: MatFormFieldControl, useExisting: NgxMatEditorComponent}
  ]
})
export class NgxMatEditorComponent implements OnDestroy, AfterViewInit, OnChanges, MatFormFieldControl<any>, ControlValueAccessor {

  static nextId = 0;
  readonly stateChanges = new Subject<void>();
  focused = false;
  controlType = 'ngx-mat-editor';
  @HostBinding() id = `${this.controlType}-${NgxMatEditorComponent.nextId++}`;
  @HostBinding('attr.aria-describedBy') describedBy = '';
  @ViewChild('editor') editor: any;
  @Input() init: {
    [key: string]: any;
  } | undefined;
  @Input() inline: boolean | undefined;
  @Input() plugins: string | undefined;
  @Input() toolbar: string | string[] | null;
  @Output() onChange: EventEmitter<EventObj<any>>;
  @Output() onInit: EventEmitter<EventObj<any>>;
  _init: {
    [key: string]: any;
  } | undefined = {
    skin: 'light',
    branding: false,
    elementpath: false,
    resize: false,
    autoresize_bottom_margin: 0,
    autoresize_max_height: 600,
    autoresize_min_height: 240,
    plugins: 'autoresize fullpage code searchreplace autolink directionality image link media table charmap hr nonbreaking insertdatetime advlist lists textcolor imagetools contextmenu colorpicker textpattern',
    toolbar: 'formatselect undo redo bold italic strikethrough forecolor backcolor link alignleft aligncenter alignright alignjustify numlist bullist outdent indent removeformat smartytags fontselect fontsizeselect image table',
    theme_modern_font_sizes: '10px,12px,13px,14px,16px,18px,20px',
    font_size_style_values: '12px,13px,14px,16px,18px,20px',
    menubar: false,
    statusbar: false
  };
  initialized = false;

  constructor(private viewContainerRef: ViewContainerRef,
              private cdRef: ChangeDetectorRef,
              @Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  _value: string | undefined = undefined;

  @Input()
  get value(): string | undefined {
    return this._value;
  }

  set value(value: string | undefined) {
    this.writeValue(value);
    this.propogateChange(value);
  }

  get errorState() {
    return this.ngControl && this.ngControl.errors !== null && this.ngControl.touched;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return true;
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
      this.detectChanges();
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
    return !this.value;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      Utils.initializeTinyMCE(scriptState, this.initialize);
    }, 300);
  }

  initialize = () => {
    setTimeout(() => {
      this.initialized = true;
      this.detectChanges();
    });
  }

  propogateChange = (_: any) => {
  } // tslint:disable-line

  propogateTouched = () => {
  } // tslint:disable-line

  detectChanges() {
    setTimeout(() => {
      if (!this.cdRef['destroyed']) {
        this.cdRef.markForCheck();
      }
    });
  }


  ngOnDestroy() {
    this.stateChanges.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.init) {
      this._init = {
        ...this._init,
        ...this.init
      };
      this.detectChanges();
      this.stateChanges.next();
    }
  }

  writeValue(value: string | undefined): void {
    this._value = value;
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

  onContainerClick() {
  }

  focusEvent() {
    this.focused = true;
    this.propogateTouched();
    this.stateChanges.next();
  }

  blurEvent() {
    this.focused = false;
    this.propogateTouched();
    this.stateChanges.next();
  }

  emitChange() {
    this.propogateChange(this._value);
  }
}
