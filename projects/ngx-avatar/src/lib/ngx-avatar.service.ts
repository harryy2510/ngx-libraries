import {Injectable} from '@angular/core';

export const defaultColor = '#1e88e5';
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
  xs = 25,
  'extra-small' = 25,
  sm = 35,
  small = 35,
  md = 45,
  medium = 45,
  lg = 60,
  large = 60,
  xl = 80,
  'extra-large' = 80
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
  fullImage?: string;

  // Defines the label
  label?: string;
  labelBgColor?: string;
  labelColor?: string;

  // Defines upload icon
  upload?: boolean;

  zoom?: boolean;

  constructor() {
    this.size = Size['md'];
    this.rounded = true;
    this.radius = 4;
    this.characters = 2;
    this.labelBgColor = defaultLabelColor;
  }
}
