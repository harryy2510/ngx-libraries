import {AfterViewInit, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {TrumbowygOptions} from '../configs/trumbowyg-options';

declare let jQuery: any;

export abstract class EditorBase
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  options: TrumbowygOptions | null = {
    svgPath: '/assets/trumbowyg/icons.svg',
    autogrow: true
  };

  placeholder: string | null;

  protected _editor: ElementRef;

  protected _initValue: string;

  private _disabled: boolean;

  private _onChange: (value: string) => void;

  private _onTouch: () => void;

  constructor(
    protected editorControl: NgControl,
    protected _config: TrumbowygOptions
  ) {
    editorControl.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.editorControl.control;
    control.setValidators(control.validator);
    control.updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    jQuery(this._editor.nativeElement)
      .trumbowyg({ ...this.options, ...this._config})
      .on('tbwinit', () => {
        jQuery(this._editor.nativeElement).trumbowyg(
          this._disabled ? 'disable' : 'enable'
        );
        this.setContent(this._initValue);
      })
      .on('tbwchange tbwpaste', () => {
        this._onChange(this.getContent());
      })
      .on('tbwfocus', () => {
        this._onTouch();
      });
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  writeValue(value: any): void {
    this._initValue = value;

    if (this._editor && this._editor.nativeElement) {
      this.setContent(value);
    }
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
  }

  ngOnDestroy(): void {
    jQuery(this._editor.nativeElement).trumbowyg('destroy');
  }

  private setContent(content: string): void {
    jQuery(this._editor.nativeElement).trumbowyg('html', content);
  }

  private getContent(): string {
    return jQuery(this._editor.nativeElement).trumbowyg('html');
  }
}
