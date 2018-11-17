import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import 'timepicker/jquery.timepicker';
import * as jQuery_ from 'jquery';
import * as moment_ from 'moment';
import {Moment} from 'moment';
import {
  momentToTpDateFormat,
  NoneObject,
  TIME_FORMAT,
  TimepickerConfig,
  TimepickerDisableEnableDate
} from './ngx-timepicker.service';

const jQuery = jQuery_;
const moment = moment_;

export interface TimepickerOutputOptions {
  selectedTime: Moment;
}

@Directive({
  selector: '[ngxTimepicker]',
  exportAs: 'timepicker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxTimepickerDirective),
      multi: true
    }
  ]
})
export class NgxTimepickerDirective implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {

  /**
   * Default: 'Element's parent'
   * Override where the dropdown is appended.
   * Takes either a string to use as a selector, a function that gets passed the clicked input element as argument or a jquery object to use directly.
   */
  @Input() appendTo: string | ((clickedElement) => string) = jQuery(this.elm.nativeElement).parent();
  /**
   * Default: null
   * A class name to apply to the HTML element that contains the timepicker dropdown.
   */
  @Input() className: string;
  /**
   * Default: false
   * Close the timepicker when the window is scrolled. (Replicates <select> behavior.)
   */
  @Input() closeOnWindowScroll: boolean;
  /**
   * Default: false
   * Disable typing in the timepicker input box; force users to select from list.
   * More information https://github.com/jonthornton/jquery-timepicker/issues/425#issuecomment-133262458
   */
  @Input() disableTextInput: boolean;
  /**
   * Default: []
   * Disable selection of certain time ranges. Input will be converted in an array of time pairs, like `[['3:00am', '4:30am'], ['5:00pm', '8:00pm']].
   * The start of the interval will be disabled but the end won't.
   */
  @Input() disableTimeRanges: TimepickerDisableEnableDate[];
  /**
   * Default: false
   * Disables the onscreen keyboard for touch devices. There can be instances where Firefox or Chrome have touch events enabled
   * (such as on Surface tablets but not actually be a touch device. In this case disableTouchKeyboard will prevent the timepicker
   * input field from being focused.
   * More information: https://github.com/jonthornton/jquery-timepicker/issues/413
   */
  @Input() disableTouchKeyboard: boolean;
  /**
   * Default: Same as the minTime
   * The time against which showDuration will compute relative times.
   */
  @Input() durationTime: string | Date | Moment | (() => string | Date | Moment);
  /**
   * Default: { am: 'am', pm: 'pm', AM: 'AM', PM: 'PM', decimal: '.', mins: 'mins', hr: 'hr', hrs: 'hrs' }
   * Language constants used in the timepicker.
   * Can override the defaults by passing an object with one or more of the following properties: decimal, mins, hr, hrs.
   */
  @Input() lang?: { [meridian: string]: string };
  /**
   * Default: false
   * Force update the time to step settings as soon as it loses focus`.
   */
  @Input() forceRoundTime: boolean;
  /**
   * Default: 24 hours after minTime
   * The time that should appear last in the dropdown list. Can be used to limit the range of time options.
   */
  @Input() maxTime: Date | string | Moment;
  /**
   * Default: 12:00 am
   * The time that should appear first in the dropdown list.
   */
  @Input() minTime: Date | string | Moment;
  /**
   * Default: false.
   * Adds one or more custom options to the top of the dropdown. Can accept several different value types:
   * Boolean (true): Adds a "None" option that results in an empty input value
   * String: Adds an option with a custom label that results in an empty input value
   * Object: Similar to string, but allows customizing the element's class name and the resulting input value. Can contain label, value, and className properties. The value property must be a string type.
   * Array: An array of strings or objects to add multiple non-time options
   */
  @Input() noneOption: boolean | string | string[] | NoneObject;
  /**
   * default: 'l'
   * By default the timepicker dropdown will be aligned to the bottom right of the input element, or aligned to the top left if there isn't enough room below the input. Force alignment with l (left), r (right), t (top), and b (bottom). Examples: tl, rb.
   */
  @Input() orientation: string;
  /**
   * Default: Rounds to the nearest step
   * Function used to compute rounded times. The function will receive time in seconds and a settings object as arguments. The function should handle a null value for seconds
   */
  @Input() roundingFunction: (seconds: number, settings: TimepickerConfig) => number;
  /**
   * Default: null
   * If no time value is selected, set the dropdown scroll position to show the time provided, e.g. "09:00". A time string, Date object, or integer (seconds past midnight) is acceptible, as well as the string 'now'
   */
  @Input() scrollDefault: string | Date | number | Moment | {};
  /**
   * Default: false
   * Update the input with the currently highlighted time value when the timepicker loses focus.
   */
  @Input() selectOnBlur: boolean;
  /**
   * Default: false
   * Show "24:00" as an option when using 24-hour time format
   */
  @Input() show2400: boolean;
  /**
   * Default: false
   * Shows the relative time for each item in the dropdown. minTime or durationTime must be set.
   */
  @Input() showDuration: boolean;
  /**
   * Default: ["click", "focus"]
   * Display a timepicker dropdown when the input fires a particular event. Set to null or an empty array to disable automatic display. Setting should be an array of strings
   */
  @Input() showOn: string[];
  /**
   * Default: 30
   * The amount of time, in minutes, between each item in the dropdown. Alternately, you can specify a function to generate steps dynamically. The function will receive a count integer (0, 1, 2...) and is expected to return a step integer.
   */
  @Input() step: number;
  /**
   * Default: false
   * When scrolling on the edge of the picker, it prevent parent containers () to scroll
   */
  @Input() stopScrollPropagation: boolean;
  /**
   * Default: 'hh:mm a'
   * How times should be displayed in the list and input element.
   */
  @Input() timeFormat: string = TIME_FORMAT;
  /**
   * Default: true
   * Highlight the nearest corresponding time option as a value is typed into the form input.
   */
  @Input() typeaheadHighlight: boolean;
  /**
   * Default: false
   * Convert the input to an HTML <SELECT> control. This is ideal for small screen devices, or if you want to prevent the user from entering
   * arbitrary values. This option is not compatible with the following options: appendTo, closeOnWindowScroll, disableTouchKeyboard,
   * scrollDefault, selectOnBlur, typeAheadHighlight.
   */
  @Input() useSelect: boolean;
  /**
   * Default: Today's date
   * Convert the time to a moment date before binding it with ngModel
   */
  @Input() date?: Date | string | Moment;

  /**
   * The native onChange event will fire any time the input value is updated,
   * whether by selection from the timepicker list or manual entry into the text input.
   * Your code should bind to change after initializing timepicker, or use event delegation.
   */
  @Output()
  timepickerChange: EventEmitter<TimepickerOutputOptions> = new EventEmitter();
  /**
   * Called after a valid time value is entered or selected.
   * See timeFormatError and timeRangeError for error events.
   * Fires before change event.
   */
  @Output()
  timepickerChangeTime: EventEmitter<TimepickerOutputOptions> = new EventEmitter();
  /**
   * Called after a time value is selected from the timepicker list.
   * Fires before change event.
   */
  @Output()
  timepickerSelectTime: EventEmitter<TimepickerOutputOptions> = new EventEmitter();
  /**
   * Called after the timepicker is shown.
   */
  @Output()
  timepickerOpen: EventEmitter<TimepickerOutputOptions> = new EventEmitter();
  /**
   * Called after the timepicker is closed.
   */
  @Output()
  timepickerClose: EventEmitter<TimepickerOutputOptions> = new EventEmitter();
  /**
   * Called if an unparseable time string is manually entered into the timepicker input.
   * Fires before change event.
   */
  @Output()
  timeFormatError: EventEmitter<TimepickerOutputOptions> = new EventEmitter();
  /**
   * Called if maxTime and minTime, or disableTimeRanges is set and an invalid time is manually entered into the timepicker input.
   * Fires before change event.
   */
  @Output()
  timeRangeError: EventEmitter<TimepickerOutputOptions> = new EventEmitter();

  @Output()
  onChange: EventEmitter<Moment> = new EventEmitter();

  private parsedFormat = momentToTpDateFormat(this.timeFormat);
  private instance: any;
  private isDisabled = false;
  private initialValue: any;
  private currentValue: any;
  private onChangeFn: (value: any) => void = () => {
  }; // tslint:disable-line
  private onTouchedFn = () => {
  }; // tslint:disable-line

  constructor(
    private config: TimepickerConfig,
    private elm: ElementRef
  ) {
    Object.keys(config).forEach((key: string) => {
      if (typeof config[key] !== 'undefined') {
        this[key] = config[key];
      }
    });
  }

  // tslint:disable-next-line
  convertFormat(key: string, value: any) {
    switch (key) {
      case 'scrollDefault':
      case 'minTime':
      case 'maxTime':
      case 'durationTime':
        if (moment.isMoment(value) && value.isValid()) {
          return moment(value).format(this.timeFormat);
        }
        break;
      case 'disableTimeRanges':
        let dateRanges: string[][] = [];
        if (value instanceof Array) {
          dateRanges = value.map((date: any) => {
            if (typeof date === 'string' || date instanceof Date || (moment.isMoment(date) && date.isValid())) {
              return this._buildTime(date);
            } else if (typeof date === 'object' && typeof date.from !== 'undefined' && typeof date.to !== 'undefined') {
              return this._buildTime(date.from, date.to);
            }
          });
        }
        return dateRanges;
    }
    return value;
  }

  _buildTime(d1: any, d2?: any): string[] {
    return [
      moment(d1).format(this.timeFormat),
      moment(d2 ? d2 : d1).add(1, 'm').format(this.timeFormat)
    ];
  }

  parseTime(d: any): Moment {
    if (d instanceof Date || typeof(d) === 'string') {
      const _time = moment(d, this.timeFormat);
      const _date = moment(this.date);
      return _date.clone().startOf('d').set({
        hours: _time.hours(),
        minutes: _time.minutes(),
        seconds: _time.seconds(),
        milliseconds: _time.milliseconds()
      });
    }
  }

  @HostListener('blur')
  onBlur() {
    this.onTouchedFn();
  }

  writeValue(value: any): void {
    this.currentValue = value ? moment(value) : null;
    if (!this.date && this.currentValue) {
      this.date = this.currentValue.clone();
    }
    this.setTime(value);
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.instance) {
      if (this.isDisabled) {
        this.instance.attr('disabled', 'disabled');
      } else {
        this.instance.removeAttr('disabled');
      }
    }
  }

  ngAfterViewInit(): void {
    const options: any = {
      appendTo: this.appendTo,
      className: this.className,
      closeOnWindowScroll: this.closeOnWindowScroll,
      disableTextInput: this.disableTextInput,
      disableTimeRanges: this.disableTimeRanges,
      disableTouchKeyboard: this.disableTouchKeyboard,
      durationTime: this.durationTime,
      forceRoundTime: this.forceRoundTime,
      lang: this.lang,
      maxTime: this.maxTime,
      minTime: this.minTime,
      noneOption: this.noneOption,
      orientation: this.orientation,
      roundingFunction: this.roundingFunction,
      scrollDefault: this.scrollDefault,
      selectOnBlur: this.selectOnBlur,
      show2400: this.show2400,
      showDuration: this.showDuration,
      showOn: this.showOn,
      step: this.step,
      stopScrollPropagation: this.stopScrollPropagation,
      timeFormat: this.parsedFormat,
      typeaheadHighlight: this.typeaheadHighlight,
      useSelect: this.useSelect
    };
    this.timeFormat = this.config.timeFormat;
    options.timeFormat = this.parsedFormat = momentToTpDateFormat(this.timeFormat);
    Object.keys(options).filter(k => k !== 'timeFormat').forEach((key: string) => {
      if (typeof options[key] === 'undefined') {
        options[key] = (this.config as any)[key];
      }
      this[key] = options[key];
      options[key] = this.convertFormat(key, options[key]);
    });
    this.instance = jQuery(this.elm.nativeElement);
    this.instance.timepicker(options);
    this.setDisabledState(this.isDisabled);
    this.setEventListeners();
  }

  setEventListeners() {
    this.instance.on('change', () => {
      const value = this.parseTime(this.elm.nativeElement.value);
      this.timepickerChange.emit({
        selectedTime: value.isValid() ? value : null
      });
    });
    this.instance.on('changeTime', () => {
      const value = this.parseTime(this.elm.nativeElement.value);
      this.timepickerChangeTime.emit({
        selectedTime: value.isValid() ? value : null
      });
      this.validate();
    });
    this.instance.on('selectTime', () => {
      const value = this.parseTime(this.elm.nativeElement.value);
      this.timepickerSelectTime.emit({
        selectedTime: value.isValid() ? value : null
      });
    });
    this.instance.on('hideTimepicker', () => {
      const value = this.parseTime(this.elm.nativeElement.value);
      this.timepickerOpen.emit({
        selectedTime: value.isValid() ? value : null
      });
      this.validate();
    });
    this.instance.on('showTimepicker', () => {
      const value = this.parseTime(this.elm.nativeElement.value);
      this.timepickerOpen.emit({
        selectedTime: value.isValid() ? value : null
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instance) {
      if (Object.keys(changes).indexOf('timeFormat') > -1) {
        this.parsedFormat = momentToTpDateFormat(this.timeFormat);
        this.instance.timepicker('option', 'timeFormat', this.parsedFormat);
      }
      Object.keys(changes).filter(k => k !== 'timeFormat').forEach((key: any) => {
        const value = this.convertFormat(key, this[key]);
        this.instance.timepicker('option', key, value);
      });
    }
  }

  ngOnDestroy(): void {
    this.instance.off();
    this.instance.timepicker('remove');
    this.instance = null;
  }

  @HostListener('change')
  inputChanged(): void {
    this.validate();
  }

  validate() {
    let parsedValue: Moment = this.parseTime(this.elm.nativeElement.value);
    parsedValue = parsedValue.isValid() ? parsedValue : null;
    if (this.isChanged(parsedValue)) {
      this.currentValue = parsedValue;
      this.onChangeFn(this.currentValue);
      this.onChange.emit(this.currentValue);
    }
    this.setTime(parsedValue);
  }

  isChanged(value: any) {
    if ((!value && this.currentValue) || (value && !this.currentValue)) {
      return true;
    }

    if (value && this.currentValue) {
      return !moment(value).startOf('m').isSame(moment(this.currentValue).startOf('m'));
    }
    return false;
  }

  private setTime(value: any) {
    const parsedValue: any = value ? moment(value).format(this.timeFormat) : null;
    if (this.instance) {
      this.instance.timepicker('setTime', parsedValue);
    } else {
      this.initialValue = parsedValue;
    }
  }
}

