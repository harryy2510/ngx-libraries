import {Injectable} from '@angular/core';
import {Circle, Doc, Image, Rect, Text} from 'svg.js';

export const defaultColor = '#29b6f6';
export const defaultLabelColor = '#f44336';
export const palette = [
  '#f44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B'
];

export enum Size {
  xs = 30,
  'extra-small' = 30,
  sm = 40,
  small = 40,
  md = 50,
  medium = 50,
  lg = 60,
  large = 60,
  xl = 80,
  'extra-large' = 80
}

export class CSSProperty {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Injectable()
export class AvatarConfig {

  // Defines the shape
  size?: number | string;
  margin?: number | string;
  rounded?: boolean;
  radius?: number;
  randomColor?: boolean;
  bgColor?: string;
  disabled?: boolean;

  // Defines the initials
  name?: string;
  characters?: number;
  textColor?: string;
  fontSize?: number;

  // Defines the image
  image?: string;

  // Defines the label
  label?: string;
  labelBgColor?: string;
  labelColor?: string;

  // Defines upload icon
  upload?: boolean;

  constructor() {
    this.size = Size['md'];
    this.margin = '0 20 0 0';
    this.rounded = true;

    this.characters = 2;

    this.labelBgColor = defaultLabelColor;
  }
}

export class Instance {
  svg: Doc;
  shape: Circle | Rect;
  image: Image;
  initials: Text;
  labelText: Text;
  labelShape: Rect;
  uploadShape: Circle | Rect;
  uploadIcon: Image;

  constructor() {
    this.svg = null;
    this.shape = null;
    this.image = null;
    this.initials = null;
    this.labelText = null;
    this.labelShape = null;
    this.uploadShape = null;
    this.uploadIcon = null;
  }
}
