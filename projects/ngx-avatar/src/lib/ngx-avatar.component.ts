import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {AvatarConfig, defaultColor, defaultLabelColor, palette, Size} from './ngx-avatar.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {coerceCssPixelValue} from '@angular/cdk/coercion';

@Component({
  selector: 'ngx-avatar-img-dialog',
  template: `<img [src]="data?.url" alt="">`
})
export class NgxAvatarImgDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}

@Component({
  selector: 'ngx-avatar',
  exportAs: 'avatar',
  templateUrl: `./ngx-avatar.component.html`,
  styleUrls: [`./ngx-avatar.component.scss`]
})
export class NgxAvatarComponent implements AfterViewInit, OnChanges {
  @Input() name: string;
  @Input() characters: number;
  @Input() image: string;
  @Input() fullImage: string;
  @Input() bgColor: string;
  @Input() textColor: string;
  @Input() size: number | string;
  @Input() fontSize: number;
  @Input() rounded: boolean;
  @Input() radius: number;
  @Input() margin: number | string;
  @Input() randomColor: boolean;
  @Input() label: string;
  @Input() labelBgColor: string;
  @Input() labelColor: string;
  @Input() disabled: boolean;
  @Input() upload: boolean;
  @Input() zoom: boolean;
  @Input() ariaLabelText: string = '';
  @Output() onClick: EventEmitter<KeyboardEvent | MouseEvent> = new EventEmitter<KeyboardEvent | MouseEvent>();

  @HostBinding('attr.aria-label') ngxAvatarArialLabel = '';
  @HostBinding('attr.role') ngxAvatarRole = 'button';
  @HostBinding('attr.tabindex') ngxAvatarTabIndex = -1;
  @HostBinding('class.ngx-avatar') ngxAvatarClass = true;
  @HostBinding('class.ngx-avatar-action') ngxAvatarActionClass = false;
  @HostBinding('class.ngx-avatar-disabled') ngxAvatarActionDisabledClass = false;
  @HostBinding('style.background-color') cssBackgroundColor: string;
  @HostBinding('style.color') cssTextColor: string;
  @HostBinding('style.width') @HostBinding('style.height') cssSize: string;
  @HostBinding('style.margin') cssMargin: string;
  @HostBinding('style.font-size') cssFontSize: string;
  @HostBinding('style.border-radius') cssBorderRadius: string;

  private options: AvatarConfig = new AvatarConfig();

  constructor(
    private config: AvatarConfig,
    public dialog: MatDialog
  ) {
  }

  get _options(): AvatarConfig {
    return this.options;
  }

  set _options(options: AvatarConfig) {
    this.options = options;
  }

  get _size(): string {
    let s: number;
    switch (typeof this._options.size) {
      case 'string':
        s = <number>Size[this._options.size];
        break;
      case 'number':
        s = <number>this._options.size;
        break;
      default:
    }
    if (!s) {
      s = Size['md'];
    }
    return coerceCssPixelValue(s);
  }

  get _margin(): string {
    if (this._options.margin === null || typeof this._options.margin === 'undefined') {
      return '';
    }
    return this._options.margin.toString().split(' ').map(v => `${v}px`).join(' ');
  }

  get _borderRadius(): string {
    if (this._options.rounded) {
      return '50%';
    }
    if (this._options.radius === null || typeof this._options.radius === 'undefined') {
      return '';
    }
    return this._options.radius.toString().split(' ').map(v => `${v}px`).join(' ');
  }

  get _bgColor(): string {
    return this._options.randomColor ? palette[Math.floor(Math.random() * palette.length)] : (this._options.bgColor ? this._options.bgColor : defaultColor);
  }

  get _initials(): string {
    if (!this._options.name) {
      return '';
    }
    const _name: string = this._options.name.replace(/^(?:(Miss|M[rs]{1,2})\.?\s+)?/i, '').replace(/[\d]/gi, '');
    const _parts: string[] = _name.split(' ');
    if (_parts.length >= this._options.characters) {
      return _parts.map(s => s.charAt(0)).join('').substring(0, this._options.characters).toUpperCase();
    }
    const st: string = _parts[0].substring(0, this._options.characters - _parts.length + 1);
    _parts.shift();
    return [st, ..._parts.map(s => s.charAt(0))].join('').substring(0, this._options.characters).toUpperCase();
  }

  get _textColor(): string {
    return this._options.textColor ? this._options.textColor : (NgxAvatarComponent.isDark(this._bgColor) ? '#fff' : '#000');
  }

  get _fontSize(): string {
    return coerceCssPixelValue(this._options.fontSize ? this._options.fontSize : parseInt(this._size, 10) * 0.4);
  }

  get _labelBgColor(): string {
    return this._options.labelBgColor ? this._options.labelBgColor : defaultLabelColor;
  }

  get _labelColor(): string {
    return this._options.labelColor ? this._options.labelColor : (NgxAvatarComponent.isDark(this._labelBgColor) ? '#fff' : '#000');
  }

  get _labelSize(): string {
    return coerceCssPixelValue(parseInt(this._size, 10) * 0.25);
  }

  get _ariaLabel(): string {
    return this.ariaLabelText ? this.ariaLabelText : (this._options.name ? this._options.name : '');
  }

  get _hasAction(): boolean {
    return this._canUpload || this._canZoom;
  }

  get _canUpload(): boolean {
    return this.upload && (!this.zoom || (this.zoom && !this.image && !this.fullImage));
  }

  get _canZoom(): boolean {
    return this.zoom && !!(this.image || this.fullImage);
  }

  static isDark(color: string): boolean {
    let r: any;
    let b: any;
    let g: any;
    let hsp: any;
    let a: any = color;

    if (a.match(/^rgb/)) {
      a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = a[1];
      g = a[2];
      b = a[3];
    } else {
      a = +('0x' + a.slice(1).replace(
          a.length < 5 && /./g, '$&$&'
        )
      );
      r = a >> 16;        // tslint:disable-line
      b = a >> 8 & 255;   // tslint:disable-line
      g = a & 255;        // tslint:disable-line
    }
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );
    return (hsp < 200);
  }

  ngAfterViewInit(): void {
    const options: AvatarConfig = {
      name: this.name,
      characters: this.characters,
      image: this.image,
      fullImage: this.fullImage,
      bgColor: this.bgColor,
      textColor: this.textColor,
      size: this.size,
      fontSize: this.fontSize,
      rounded: this.rounded,
      radius: this.radius,
      margin: this.margin,
      randomColor: this.randomColor,
      label: this.label,
      labelBgColor: this.labelBgColor,
      labelColor: this.labelColor,
      disabled: this.disabled,
      upload: this.upload,
      zoom: this.zoom
    };
    Object.keys(options).forEach((key: string) => {
      if (typeof options[key] === 'undefined') {
        options[key] = (this.config as any)[key];
      }
      this[key] = options[key];
    });
    this._options = options;
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach((key: any) => {
      this._options[key] = changes[key].currentValue;
    });
    this.update();
  }

  update() {
    this.ngxAvatarArialLabel = this._ariaLabel;
    this.cssBackgroundColor = this._bgColor;
    this.cssFontSize = this._fontSize;
    this.cssTextColor = this._textColor;
    this.cssMargin = this._margin;
    this.cssSize = this._size;
    this.cssBorderRadius = this._borderRadius;
    this.ngxAvatarTabIndex = this._hasAction ? 0 : -1;
    this.ngxAvatarActionClass = this._hasAction;
    this.ngxAvatarActionDisabledClass = this._options.disabled;
  }

  @HostListener('keyup.space', ['$event'])
  @HostListener('keyup.enter', ['$event'])
  @HostListener('click', ['$event'])
  onAvatarClick(event: MouseEvent | KeyboardEvent) {
    if (this._hasAction) {
      event.preventDefault();
      event.stopPropagation();
      if (this._canZoom) {
        this.dialog.open(NgxAvatarImgDialogComponent, {
          width: '480px',
          data: {url: this._options.fullImage || this._options.image},
          panelClass: 'mat-ngx-avatar-img-dialog'
        });
      } else if (this._canUpload) {
        this.onClick.emit(event);
      }
    }
  }
}
