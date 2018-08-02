import {Injectable} from '@angular/core';
import * as moment_ from 'moment';
import {Moment} from 'moment';

const moment = moment_;

export const TIME_FORMAT = 'hh:mm a';

export type ITimepickerDisableEnableDate =
  | string
  | Moment
  | Date
  | { from: Date | string | Moment; to: Date | string | Moment };

export interface NoneObject {
  label: string;
  value: string;
  className: string;
}

// tslint:disable no-inferrable-types
export interface ITimepickerConfig {
  /**
   * Default: 'body'
   * Override where the dropdown is appended.
   * Takes either a string to use as a selector, a function that gets passed the clicked input element as argument or a jquery object to use directly.
   */
  appendTo?: string | ((clickedElement) => string);
  /**
   * Default: null
   * A class name to apply to the HTML element that contains the timepicker dropdown.
   */
  className?: string;
  /**
   * Default: false
   * Close the timepicker when the window is scrolled. (Replicates <select> behavior.)
   */
  closeOnWindowScroll?: boolean;
  /**
   * Default: false
   * Disable typing in the timepicker input box; force users to select from list.
   * More information https://github.com/jonthornton/jquery-timepicker/issues/425#issuecomment-133262458
   */
  disableTextInput?: boolean;
  /**
   * Default: []
   * Disable selection of certain time ranges. Input will be converted in an array of time pairs, like `[['3:00am', '4:30am'], ['5:00pm', '8:00pm']].
   * The start of the interval will be disabled but the end won't.
   */
  disableTimeRanges?: ITimepickerDisableEnableDate[];
  /**
   * Default: false
   * Disables the onscreen keyboard for touch devices. There can be instances where Firefox or Chrome have touch events enabled
   * (such as on Surface tablets but not actually be a touch device. In this case disableTouchKeyboard will prevent the timepicker
   * input field from being focused.
   * More information: https://github.com/jonthornton/jquery-timepicker/issues/413
   */
  disableTouchKeyboard?: boolean;
  /**
   * Default: Same as the minTime
   * The time against which showDuration will compute relative times.
   */
  durationTime?: string | Date | Moment | (() => string | Date | Moment);

  /**
   * Default: { am: 'am', pm: 'pm', AM: 'AM', PM: 'PM', decimal: '.', mins: 'mins', hr: 'hr', hrs: 'hrs' }
   * Language constants used in the timepicker.
   * Can override the defaults by passing an object with one or more of the following properties: decimal, mins, hr, hrs.
   */
  lang?: { [meridian: string]: string };

  /**
   * Default: false
   * Force update the time to step settings as soon as it loses focus`.
   */
  forceRoundTime?: boolean;
  /**
   * Default: 24 hours after minTime
   * The time that should appear last in the dropdown list. Can be used to limit the range of time options.
   */
  maxTime?: Date | string | Moment;
  /**
   * Default: 12:00 am
   * The time that should appear first in the dropdown list.
   */
  minTime?: Date | string | Moment;
  /**
   * Default: false.
   * Adds one or more custom options to the top of the dropdown. Can accept several different value types:
   * Boolean (true): Adds a "None" option that results in an empty input value
   * String: Adds an option with a custom label that results in an empty input value
   * Object: Similar to string, but allows customizing the element's class name and the resulting input value. Can contain label, value, and className properties. The value property must be a string type.
   * Array: An array of strings or objects to add multiple non-time options
   */
  noneOption?: boolean | string | string[] | NoneObject;
  /**
   * default: 'l'
   * By default the timepicker dropdown will be aligned to the bottom right of the input element, or aligned to the top left if there isn't enough room below the input. Force alignment with l (left), r (right), t (top), and b (bottom). Examples: tl, rb.
   */
  orientation?: string;
  /**
   * Default: Rounds to the nearest step
   * Function used to compute rounded times. The function will receive time in seconds and a settings object as arguments. The function should handle a null value for seconds
   */
  roundingFunction?: (seconds: number, settings: ITimepickerConfig) => number;
  /**
   * Default: null
   * If no time value is selected, set the dropdown scroll position to show the time provided, e.g. "09:00". A time string, Date object, or integer (seconds past midnight) is acceptible, as well as the string 'now'
   */
  scrollDefault?: string | Date | number | Moment | {};
  /**
   * Default: false
   * Update the input with the currently highlighted time value when the timepicker loses focus.
   */
  selectOnBlur?: boolean;
  /**
   * Default: false
   * Show "24:00" as an option when using 24-hour time format
   */
  show2400?: boolean;
  /**
   * Default: false
   * Shows the relative time for each item in the dropdown. minTime or durationTime must be set.
   */
  showDuration?: boolean;
  /**
   * Default: ["click", "focus"]
   * Display a timepicker dropdown when the input fires a particular event. Set to null or an empty array to disable automatic display. Setting should be an array of strings
   */
  showOn?: string[];
  /**
   * Default: 30
   * The amount of time, in minutes, between each item in the dropdown. Alternately, you can specify a function to generate steps dynamically. The function will receive a count integer (0, 1, 2...) and is expected to return a step integer.
   */
  step?: number;
  /**
   * Default: false
   * When scrolling on the edge of the picker, it prevent parent containers () to scroll
   */
  stopScrollPropagation?: boolean;
  /**
   * Default: 'hh:mm a'
   * How times should be displayed in the list and input element.
   */
  timeFormat?: string;
  /**
   * Default: true
   * Highlight the nearest corresponding time option as a value is typed into the form input.
   */
  typeaheadHighlight?: boolean;
  /**
   * Default: false
   * Convert the input to an HTML <SELECT> control. This is ideal for small screen devices, or if you want to prevent the user from entering
   * arbitrary values. This option is not compatible with the following options: appendTo, closeOnWindowScroll, disableTouchKeyboard,
   * scrollDefault, selectOnBlur, typeAheadHighlight.
   */
  useSelect?: boolean;
  /**
   * Default: Today's date
   * Convert the time to a moment date before binding it with ngModel
   */
  date?: Date | string | Moment;
}

@Injectable()
export class TimepickerDefaults implements ITimepickerConfig {
  /**
   * Default: 'Element's parent'
   * Override where the dropdown is appended.
   * Takes either a string to use as a selector, a function that gets passed the clicked input element as argument or a jquery object to use directly.
   */
  appendTo?: string | ((clickedElement) => string);
  /**
   * Default: null
   * A class name to apply to the HTML element that contains the timepicker dropdown.
   */
  className?: string = null;
  /**
   * Default: false
   * Close the timepicker when the window is scrolled. (Replicates <select> behavior.)
   */
  closeOnWindowScroll?: boolean = false;
  /**
   * Default: false
   * Disable typing in the timepicker input box; force users to select from list.
   * More information https://github.com/jonthornton/jquery-timepicker/issues/425#issuecomment-133262458
   */
  disableTextInput?: boolean = false;
  /**
   * Default: []
   * Disable selection of certain time ranges. Input will be converted in an array of time pairs, like `[['3:00am', '4:30am'], ['5:00pm', '8:00pm']].
   * The start of the interval will be disabled but the end won't.
   */
  disableTimeRanges?: ITimepickerDisableEnableDate[] = [];
  /**
   * Default: false
   * Disables the onscreen keyboard for touch devices. There can be instances where Firefox or Chrome have touch events enabled
   * (such as on Surface tablets but not actually be a touch device. In this case disableTouchKeyboard will prevent the timepicker
   * input field from being focused.
   * More information: https://github.com/jonthornton/jquery-timepicker/issues/413
   */
  disableTouchKeyboard?: boolean = false;
  /**
   * Default: Same as the minTime
   * The time against which showDuration will compute relative times.
   */
  durationTime?: string | Date | Moment | (() => string | Date | Moment) = null;
  /**
   * Default: false
   * Force update the time to step settings as soon as it loses focus`.
   */
  forceRoundTime?: boolean = false;

  /**
   * Default: { am: 'am', pm: 'pm', AM: 'AM', PM: 'PM', decimal: '.', mins: 'mins', hr: 'hr', hrs: 'hrs' }
   * Language constants used in the timepicker.
   * Can override the defaults by passing an object with one or more of the following properties: decimal, mins, hr, hrs.
   */
  lang?: { [meridian: string]: string } = null;

  /**
   * Default: 24 hours after minTime
   * The time that should appear last in the dropdown list. Can be used to limit the range of time options.
   */
  maxTime?: Date | string | Moment = null;
  /**
   * Default: 12:00 am
   * The time that should appear first in the dropdown list.
   */
  minTime?: Date | string | Moment = null;
  /**
   * Default: false.
   * Adds one or more custom options to the top of the dropdown. Can accept several different value types:
   * Boolean (true): Adds a "None" option that results in an empty input value
   * String: Adds an option with a custom label that results in an empty input value
   * Object: Similar to string, but allows customizing the element's class name and the resulting input value. Can contain label, value, and className properties. The value property must be a string type.
   * Array: An array of strings or objects to add multiple non-time options
   */
  noneOption?: boolean | string | string[] | NoneObject = null;
  /**
   * default: 'l'
   * By default the timepicker dropdown will be aligned to the bottom right of the input element, or aligned to the top left if there isn't enough room below the input. Force alignment with l (left), r (right), t (top), and b (bottom). Examples: tl, rb.
   */
  orientation?: string = 'l';
  /**
   * Default: Rounds to the nearest step
   * Function used to compute rounded times. The function will receive time in seconds and a settings object as arguments. The function should handle a null value for seconds
   */
  roundingFunction?: (seconds: number, settings: ITimepickerConfig) => number;
  /**
   * Default: null
   * If no time value is selected, set the dropdown scroll position to show the time provided, e.g. "09:00". A time string, Date object, or integer (seconds past midnight) is acceptible, as well as the string 'now'
   */
  scrollDefault?: string | Date | number | Moment | {} = null;
  /**
   * Default: false
   * Update the input with the currently highlighted time value when the timepicker loses focus.
   */
  selectOnBlur?: boolean = true;
  /**
   * Default: false
   * Show "24:00" as an option when using 24-hour time format
   */
  show2400?: boolean = false;
  /**
   * Default: false
   * Shows the relative time for each item in the dropdown. minTime or durationTime must be set.
   */
  showDuration?: boolean = false;
  /**
   * Default: ["click", "focus"]
   * Display a timepicker dropdown when the input fires a particular event. Set to null or an empty array to disable automatic display. Setting should be an array of strings
   */
  showOn?: string[] = ["click", "focus"];
  /**
   * Default: 30
   * The amount of time, in minutes, between each item in the dropdown. Alternately, you can specify a function to generate steps dynamically. The function will receive a count integer (0, 1, 2...) and is expected to return a step integer.
   */
  step?: number = 30;
  /**
   * Default: false
   * When scrolling on the edge of the picker, it prevent parent containers () to scroll
   */
  stopScrollPropagation?: boolean = false;
  /**
   * Default: 'hh:mm a'
   * How times should be displayed in the list and input element.
   */
  timeFormat?: string = TIME_FORMAT;
  /**
   * Default: true
   * Highlight the nearest corresponding time option as a value is typed into the form input.
   */
  typeaheadHighlight?: boolean = true;
  /**
   * Default: false
   * Convert the input to an HTML <SELECT> control. This is ideal for small screen devices, or if you want to prevent the user from entering
   * arbitrary values. This option is not compatible with the following options: appendTo, closeOnWindowScroll, disableTouchKeyboard,
   * scrollDefault, selectOnBlur, typeAheadHighlight.
   */
  useSelect?: boolean = false;
  /**
   * Default: Today's date
   * Convert the time to a moment date before binding it with ngModel
   */
  date?: Date | string | Moment = moment().startOf('d');
}

export const momentToTpDateFormat = (format: string) => {
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
  format = format ? format.toString() : TIME_FORMAT;
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
