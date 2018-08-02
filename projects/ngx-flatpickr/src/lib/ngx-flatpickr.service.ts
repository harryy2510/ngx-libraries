import {Injectable} from '@angular/core';
import {Moment} from 'moment';

export const DATE_FORMAT = 'MMM DD, YYYY';

export type IFlatpickrDisableEnableDate =
  | string
  | Moment
  | Date
  | { from: Date | string | Moment; to: Date | string | Moment }
  | ((date: Date | Moment) => boolean);

// tslint:disable no-inferrable-types
export interface IFlatpickrConfig {
  /**
   * Exactly the same as date format, but for the altInput field.
   */
  altFormat?: string;

  /**
   *  Show the user a readable date (as per altFormat), but return something totally different to the server.
   */
  altInput?: boolean;

  /**
   * This class will be added to the input element created by the altInput option.
   * Note that `altInput` already inherits classes from the original input.
   */
  altInputClass?: string;

  /**
   * Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
   */
  allowInput?: boolean;

  /**
   * Instead of `body`, appends the calendar to the specified node instead.
   */
  appendTo?: HTMLElement;

  /**
   * Defines how the date will be formatted in the aria-label for calendar days,
   * using the same tokens as dateFormat.
   * If you change this, you should choose a value that will make sense if a screen reader reads it out loud.
   */
  ariaDateFormat?: string;

  /**
   * Defines how the dates will be separated when mode is set to be multiple
   */
  conjunction?: string;

  /**
   * Whether clicking on the input should open the picker.
   * You could disable this if you wish to open the calendar manually `with.open()`.
   */
  clickOpens?: boolean;

  /**
   * A string of characters which are used to define how the date will be displayed in the input box.
   * The supported characters are defined in the table below.
   */
  dateFormat?: string;
  /**
   * Initial value of the hour element.
   */
  defaultHour?: number;
  /**
   * Initial value of the minute element.
   */
  defaultMinute?: number;

  /**
   * See <a href="https://chmln.github.io/flatpickr/examples/#disabling-specific-dates">disabling dates</a>.
   */
  disable?: IFlatpickrDisableEnableDate[];

  /**
   * Set disableMobile to true to always use the non-native picker.
   * By default, Flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
   */
  disableMobile?: boolean;

  /**
   * See <a href="https://chmln.github.io/flatpickr/examples/#disabling-all-dates-except-select-few">enabling dates</a>.
   */
  enable?: IFlatpickrDisableEnableDate[];

  /**
   * Enables time picker.
   */
  enableTime?: boolean;

  /**
   * Enables seconds in the time picker.
   */
  enableSeconds?: boolean;
  /**
   * Allows using a custom date formatting function instead of the built-in handling for date formats using dateFormat, altFormat, etc.
   */
  formatDate?: (value: any) => string;
  /**
   * Adjusts the step for the hour input (incl. scrolling).
   */
  hourIncrement?: number;

  /**
   * Displays the calendar inline.
   */
  inline?: boolean;

  /**
   * The maximum date that a user can pick to (inclusive).
   */
  maxDate?: string | Date | Moment;

  /**
   * The minimum date that a user can start picking from (inclusive).
   */
  minDate?: string | Date | Moment;

  /**
   * Adjusts the step for the minute input (incl. scrolling).
   */
  minuteIncrement?: number;

  /**
   * Select a single date, multiple dates or a date range.
   */
  mode?: 'single' | 'multiple' | 'range';

  /**
   * HTML for the arrow icon, used to switch months.
   */
  nextArrow?: string;

  /**
   * Hides the day selection in calendar. Use it along with `enableTime` to create a time picker.
   */
  noCalendar?: boolean;

  /**
   * Function that expects a date string and must return a Date object.
   */
  parseDate?: (str: string) => Date | Moment;

  /**
   * HTML for the left arrow icon.
   */
  prevArrow?: string;

  /**
   * Show the month using the shorthand version (ie, Sep instead of September).
   */
  shorthandCurrentMonth?: boolean;

  /**
   * Position the calendar inside the wrapper and next to the input element. (Leave `false` unless you know what you're doing).
   */
  static?: boolean;

  /**
   * Displays time picker in 24 hour mode without AM/PM selection when enabled.
   */
  time_24hr?: boolean;

  /**
   * When true, dates will parsed, formatted, and displayed in UTC.
   * It's recommended that date strings contain the timezone, but not necessary.
   */
  utc?: boolean;

  /**
   * Enables display of week numbers in calendar.
   */
  weekNumbers?: boolean;

  /**
   * You may override the function that extracts the week numbers from a Date by supplying a getWeek function.
   * It takes in a date as a parameter and should return a corresponding string that you want to appear left of every week.
   */
  getWeek?: (date: Date | Moment) => string;

  /**
   * Custom elements and input groups.
   */
  wrap?: boolean;

  /**
   * Array of plugin instances to use.
   */
  plugins?: any[];

  /**
   * The locale object or string to use for the locale.
   */
  locale?: object | string;
}

@Injectable()
export class FlatpickrDefaults implements IFlatpickrConfig {
  /**
   * Exactly the same as date format, but for the altInput field.
   */
  altFormat: string = DATE_FORMAT;

  /**
   *  Show the user a readable date (as per altFormat), but return something totally different to the server.
   */
  altInput: boolean = false;

  /**
   * This class will be added to the input element created by the altInput option.
   * Note that `altInput` already inherits classes from the original input.
   */
  altInputClass: string = '';

  /**
   * Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
   */
  allowInput: boolean = false;

  /**
   * Instead of `body`, appends the calendar to the specified node instead.
   */
  appendTo: HTMLElement = undefined;

  /**
   * Defines how the date will be formatted in the aria-label for calendar days,
   * using the same tokens as dateFormat.
   * If you change this, you should choose a value that will make sense if a screen reader reads it out loud.
   */
  ariaDateFormat?: string = DATE_FORMAT;


  /**
   * Defines how the dates will be separated when mode is set to be multiple
   */
  conjunction?: string = '; ';

  /**
   * Whether clicking on the input should open the picker.
   * You could disable this if you wish to open the calendar manually `with.open()`.
   */
  clickOpens: boolean = true;

  /**
   * A string of characters which are used to define how the date will be displayed in the input box.
   * The supported characters are defined in the table below.
   */
  dateFormat: string = DATE_FORMAT;

  /**
   * Initial value of the hour element.
   */
  defaultHour?: number = 12;

  /**
   * Initial value of the minute element.
   */
  defaultMinute?: number = 0;

  /**
   * See <a href="https://chmln.github.io/flatpickr/examples/#disabling-specific-dates">disabling dates</a>.
   */
  disable: IFlatpickrDisableEnableDate[] = [];

  /**
   * Set disableMobile to true to always use the non-native picker.
   * By default, Flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
   */
  disableMobile: boolean = true;

  /**
   * See <a href="https://chmln.github.io/flatpickr/examples/#disabling-all-dates-except-select-few">enabling dates</a>.
   */
  enable: IFlatpickrDisableEnableDate[] = [];

  /**
   * Enables time picker.
   */
  enableTime: boolean = false;

  /**
   * Enables seconds in the time picker.
   */
  enableSeconds: boolean = false;

  /**
   * Allows using a custom date formatting function instead of the built-in handling for date formats using dateFormat, altFormat, etc.
   */
  formatDate?: (value: any) => string = undefined;

  /**
   * Adjusts the step for the hour input (incl. scrolling).
   */
  hourIncrement: number = 1;

  /**
   * Displays the calendar inline.
   */
  inline: boolean = false;

  /**
   * The maximum date that a user can pick to (inclusive).
   */
  maxDate: Date | Moment = undefined;

  /**
   * The minimum date that a user can start picking from (inclusive).
   */
  minDate: Date | Moment = undefined;

  /**
   * Adjusts the step for the minute input (incl. scrolling).
   */
  minuteIncrement: number = 5;

  /**
   * Select a single date, multiple dates or a date range.
   */
  mode: 'single' | 'multiple' | 'range' = 'single';

  /**
   * HTML for the arrow icon, used to switch months.
   */
    // tslint:disable-next-line
  nextArrow: string = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"><g><path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/></g></svg>`;

  /**
   * Hides the day selection in calendar. Use it along with `enableTime` to create a time picker.
   */
  noCalendar: boolean = false;

  /**
   * Function that expects a date string and must return a Date object.
   */
  parseDate: (str: string) => Date | Moment;

  /**
   * HTML for the left arrow icon.
   */
    // tslint:disable-next-line
  prevArrow: string = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"><g><path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/></g></svg>`;

  /**
   * Show the month using the shorthand version (ie, Sep instead of September).
   */
  shorthandCurrentMonth: boolean = false;

  /**
   * Position the calendar inside the wrapper and next to the input element. (Leave `false` unless you know what you're doing).
   */
  static: boolean = false;

  /**
   * Displays time picker in 24 hour mode without AM/PM selection when enabled.
   */
  time_24hr: boolean = false;

  /**
   * When true, dates will parsed, formatted, and displayed in UTC.
   * It's recommended that date strings contain the timezone, but not necessary.
   */
  utc: boolean = false;

  /**
   * Enables display of week numbers in calendar.
   */
  weekNumbers: boolean = false;

  /**
   * You may override the function that extracts the week numbers from a Date by supplying a getWeek function.
   * It takes in a date as a parameter and should return a corresponding string that you want to appear left of every week.
   */
  getWeek: (date: Date | Moment) => string;

  /**
   * Custom elements and input groups.
   */
  wrap: boolean = false;

  /**
   * Array of plugin instances to use.
   */
  plugins: any[] = [];

  /**
   * The locale object or string to use for the locale.
   */
  locale: object | string;
}

export const momentToFpDateFormat = (format: string) => {
  const replacement = {
    'DD': 'd',
    'ddd': 'D',
    'D': 'j',
    'dddd': 'l',
    'E': 'N',
    'o': 'S',
    'e': 'w',
    'DDD': 'z',
    'W': 'W',
    'MMMM': 'F',
    'MMM': 'M',
    'MM': 'm',
    'M': 'n',
    'YYYY': 'Y',
    'YY': 'y',
    'a': 'a',
    'A': 'A',
    'hh': 'h',
    'HH': 'H',
    'h': 'g',
    'H': 'G',
    'mm': 'i',
    'ss': 's',
    'SSS': 'u',
    'zz': 'e',
    'X': 'U'
  };
  format = format ? format.toString() : DATE_FORMAT;
  format = strtr(format, replacement);
  return format;
};

const strtr = (str: string, replacement: any) => {
  let from = [];
  let to = [];
  for (const fr in replacement) {
    if (replacement.hasOwnProperty(fr)) {
      from = [...from, fr];
      to = [...to, replacement[fr]];
    }
  }
  const lenStr = str.length;
  const lenFrom = from.length;
  let j = 0;
  let ret = '';
  let match = false;
  for (let i = 0; i < lenStr; i++) {
    match = false;
    for (j = 0; j < lenFrom; j++) {
      if (str.substr(i, from[j].length) === from[j]) {
        match = true;
        i = (i + from[j].length) - 1;
        break;
      }
    }
    if (match) {
      ret += to[j];
    } else {
      ret += str.charAt(i);
    }
  }
  return ret;
};
