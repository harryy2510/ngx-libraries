import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  AvatarConfig,
  CSSProperty,
  defaultColor,
  defaultLabelColor,
  Instance,
  palette,
  Size
} from './ngx-avatar.service';
import * as SVG_ from 'svg.js';
import {Circle, Doc, Image, Rect, Text} from 'svg.js';
import 'svg.filter.js';

const SVG = SVG_;

@Component({
  selector: 'ngx-avatar',
  template: ``,
  exportAs: 'avatar'
})
export class NgxAvatarComponent implements AfterViewInit, OnChanges {
  @Input() name: string;
  @Input() characters: number;
  @Input() image: string;
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
  private instance: Instance = new Instance();
  private options: AvatarConfig = new AvatarConfig();

  constructor(
    private config: AvatarConfig,
    private elm: ElementRef
  ) {
  }

  get _options(): AvatarConfig {
    return this.options;
  }

  set _options(options: AvatarConfig) {
    this.options = options;
  }

  get _size(): number {
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
    return s;
  }

  get _margin(): CSSProperty {
    return NgxAvatarComponent.expandProperty(this._options.margin);
  }

  get _bgColor(): string {
    return this._options.randomColor ? palette[Math.floor(Math.random() * palette.length)] : (this._options.bgColor ? this._options.bgColor : defaultColor);
  }

  get _initials(): string {
    if (!this._options.name) {
      return '';
    }
    const _name: string = this._options.name.replace(/^(?:(Miss|M[rs]{1,2})\.?\s+)?/i, '');
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

  get _fontSize(): number {
    return this._options.fontSize ? this._options.fontSize : this._size * 0.4;
  }

  get _labelBgColor(): string {
    return this._options.labelBgColor ? this._options.labelBgColor : defaultLabelColor;
  }

  get _labelColor(): string {
    return this._options.labelColor ? this._options.labelColor : (NgxAvatarComponent.isDark(this._labelBgColor) ? '#fff' : '#000');
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

  static expandProperty(value?: string | number): CSSProperty {
    const returnObj: CSSProperty = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    if (value) {
      switch (typeof value) {
        case 'number':
          returnObj.top = returnObj.bottom = returnObj.left = returnObj.right = (value as number);
          break;
        case 'string':
          const properties = (value as string).split(' ').map((m: string) => +m.replace(/\D/g, ''));
          switch (properties.length) {
            case 1:
              returnObj.top = returnObj.bottom = returnObj.left = returnObj.right = properties[0];
              break;
            case 2:
              returnObj.left = returnObj.right = properties[1];
              break;
            case 3:
              returnObj.left = returnObj.right = properties[1];
              returnObj.bottom = properties[2];
              break;
            case 4:
              returnObj.right = properties[1];
              returnObj.bottom = properties[2];
              returnObj.left = properties[3];
              break;
          }
          break;
      }
    }
    return returnObj;
  }

  ngAfterViewInit(): void {
    const options: AvatarConfig = {
      name: this.name,
      characters: this.characters,
      image: this.image,
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
      upload: this.upload
    };
    Object.keys(options).forEach((key: string) => {
      if (typeof options[key] === 'undefined') {
        options[key] = (this.config as any)[key];
      }
      this[key] = options[key];
    });
    this._options = options;
    this.render();
  }

  render() {
    this.destroySvg();
    this.renderSvg();
    this.renderShape();
    this.renderInitials();
    this.renderImage();
    this.renderUpload();
    this.renderLabel();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.instance.svg) {
      Object.keys(changes).forEach((key: any) => {
        this._options[key] = changes[key].currentValue;
      });

      if (changes.size || changes.margin || changes.rounded || changes.radius || changes.disabled) {
        this.render();
        return;
      }

      if (changes.randomColor || changes.bgColor) {
        this.update('bgColor');
      }

      if (changes.name || changes.characters || changes.fontSize) {
        this.update('name');
      }

      if (changes.textColor) {
        this.update('textColor');
      }

      if (changes.image) {
        this.renderImage();
        this.renderUpload();
        this.renderLabel();
      }

      if (changes.upload) {
        this.renderUpload();
        this.renderLabel();
      }

      if (changes.label || changes.labelBgColor || changes.labelColor) {
        this.renderLabel();
      }
    }
  }

  update(prop: string) {
    switch (prop) {
      case 'bgColor':
        this.instance.shape = this.renderColor(this.instance.shape, this._bgColor, 0.5);
        break;
      case 'name':
        if (!this._initials) {
          this.destroyInitials();
          return;
        }
        this.instance.initials = this.setText(this.instance.initials, this._initials, this._fontSize);
        break;
      case 'textColor':
        this.instance.initials = this.renderColor(this.instance.initials, this._textColor, 0.8);
        break;
    }
  }

  private renderSvg(): void {
    const {top, right, bottom, left} = this._margin;
    const svgElement = <Doc>SVG(this.elm.nativeElement);
    svgElement
      .size(this._size + left + right, this._size + top + bottom);
    this.instance.svg = svgElement;
  }

  private destroySvg(): void {
    if (this.instance.svg) {
      this.instance.svg.remove();
      this.instance.svg = null;
      this.instance.shape = null;
      this.instance.initials = null;
      this.instance.image = null;
    }
  }

  private renderShape(): void {
    if (!this.instance.svg) {
      return null;
    }
    let shape: Circle | Rect;
    const {top, left} = this._margin;
    if (this._options.rounded) {
      shape = <Circle>this.instance.svg
        .circle(this._size);
    } else {
      shape = <Rect>this.instance.svg
        .rect(this._size, this._size)
        .radius(this._options.radius);
    }
    shape.move(left, top);
    this.instance.shape = this.renderColor(shape, this._bgColor, 0.5);
  }

  private renderInitials(): void {
    this.destroyInitials();
    if (!this.instance.svg || !this._initials) {
      return null;
    }
    const {top, left} = this._margin;
    let shape: Text = <Text>this.instance.svg
      .text('');
    shape = this.setText(shape, this._initials, this._fontSize);
    shape.center((this._size / 2) + left, (this._size / 2) + top);
    shape = this.renderColor(shape, this._textColor, 0.8);
    this.instance.initials = shape;
  }

  private destroyInitials(): void {
    if (this.instance.initials) {
      this.instance.initials.remove();
      this.instance.initials = null;
    }
  }

  private renderImage(): void {
    this.destroyImage();
    if (!this.instance.svg || !this._options.image) {
      return null;
    }
    const {top, left} = this._margin;
    const image: Image = <Image>this.instance.svg.image(this.options.image);
    image.loaded(() => {
      image.size(this._size)
        .center((this._size / 2) + left, (this._size / 2) + top)
        .clipWith(this.getClip());
      if (this._options.disabled) {
        (image as any).filter((add: any) => {
          add.colorMatrix('saturate', 0);
        });
      }
      this.destroyInitials();
    });
    this.instance.image = image;
  }

  private destroyImage(): void {
    if (this.instance.image) {
      const c = this.instance.image.reference('clip-path');
      if (c) {
        c.remove();
      }
      this.instance.image.remove();
      this.instance.image = null;
    }

    if (this._options.name) {
      this.renderInitials();
    }
  }

  private renderLabel(): void {
    this.destroyLabel();
    if (!this.instance.svg || !this._options.label) {
      return null;
    }
    const {top, left} = this._margin;
    let labelShape: Rect = <Rect>this.instance.svg
      .rect(this._size, this._size * 0.25)
      .radius(2)
      .move(left, top + this._size - (this._size * 0.25));
    labelShape = this.renderColor(labelShape, this._labelBgColor, 0.8);
    this.instance.labelShape = labelShape;

    let labelText: Text = <Text>this.instance.svg
      .text('');
    labelText = this.setText(labelText, this._options.label, this._size * 0.25);
    labelText.center((this._size / 2) + left, top + this._size - ((this._size * 0.25) / 2));
    labelText = this.renderColor(labelText, this._labelColor, 0.8);
    this.instance.labelText = labelText;
  }

  private destroyLabel(): void {
    if (this.instance.labelShape) {
      this.instance.labelShape.remove();
      this.instance.labelShape = null;
    }
    if (this.instance.labelText) {
      this.instance.labelText.remove();
      this.instance.labelText = null;
    }
  }

  private renderUpload(): void {
    this.destroyUpload();
    if (!this.instance.svg || !this._options.upload) {
      return null;
    }

    let uploadShape: Circle | Rect;
    const {top, left} = this._margin;
    if (this._options.rounded) {
      uploadShape = <Circle>this.instance.svg
        .circle(this._size);
    } else {
      uploadShape = <Rect>this.instance.svg
        .rect(this._size, this._size)
        .radius(this._options.radius);
    }
    uploadShape
      .fill('rgba(0,0,0,0.7)')
      .opacity(0)
      .move(left, top);
    this.instance.uploadShape = uploadShape;

    const uploadIcon: Image = <Image>this.instance.svg.image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAABD0lEQVR4Ae2UMU7DMBRAHSF1q5QJFtpeJbegU7kJTSbKUHVpjwEcIZEQJ4CxMNuTzQke0p9iiyJ/MyF4m9/wlPzk2/xBOOedlDcutJkpr3zFC1NNZsIzp3hiYk5DRYdFi6WjikMbSrmLQ4FSfByinLyQp2fPnh5fHrIszQiW2JLQkUuTwIKjNmSZi69Z09OzppbzHKsLrcQ2+NG0GnErTShQydN4xnhq+XVDfuhRXEtKK/4+P7QTN5AyiN/lh7bfhrb5oYesV1MMO8RWhn3GR8nnD6NMI+4aNCHHTHxNy8BASy3nGU6/IovSFUlxydJeYX92jRw4MGivET1JyFKKjUO3lLIxMdzg0OLozC/mn08zYTU6ftNUcgAAAABJRU5ErkJggg==');
    uploadIcon.loaded(() => {
      uploadIcon
        .size(this._size * 0.5)
        .center((this._size / 2) + left, (this._size / 2) + top)
        .opacity(0)
        .clipWith(this.getClip());
    });
    this.instance.uploadIcon = uploadIcon;

    this.instance.svg.on('mouseover', () => {
      this.instance.uploadShape
        .opacity(1);
      this.instance.uploadIcon
        .opacity(1);
    });

    this.instance.svg.on('mouseout', () => {
      this.instance.uploadShape
        .opacity(0);
      this.instance.uploadIcon
        .opacity(0);
    });

    this.instance.svg.style('cursor', 'pointer');
  }

  private destroyUpload(): void {

    if (this.instance.svg) {
      this.instance.svg.off('mouseover');
      this.instance.svg.off('mouseout');
      this.instance.svg.style('cursor', 'default');
    }

    if (this.instance.uploadShape) {
      this.instance.uploadShape.remove();
      this.instance.uploadShape = null;
    }
    if (this.instance.uploadIcon) {
      const c = this.instance.uploadIcon.reference('clip-path');
      if (c) {
        c.remove();
      }
      this.instance.uploadIcon.remove();
      this.instance.uploadIcon = null;
    }
  }

  private renderColor<T>(shape: T, color: string, opacity: number): T {
    if (!shape) {
      return null;
    }
    return (shape as any)
      .fill(color)
      .opacity(this._options.disabled ? opacity : 1);
  }

  private setText<T>(shape: T, text: string, size: number): T {
    if (!shape) {
      return null;
    }
    return (shape as any)
      .text(text)
      .font({size: size});
  }

  private getClip(): Circle | Rect {
    let clip: Circle | Rect;
    const {top, left} = this._margin;
    if (this._options.rounded) {
      clip = <Circle>this.instance.svg
        .circle(this._size - 4);
    } else {
      clip = <Rect>this.instance.svg
        .rect(this._size - 4, this._size - 4)
        .radius(this._options.radius);
    }
    clip.move(left + 2, top + 2);
    return clip;
  }
}
