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
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {FlatpickrConfig, FlatpickrDisableEnableDate, momentToFpDateFormat} from './ngx-flatpickr.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import flatpickr from 'flatpickr';
import weekSelectPlugin from 'flatpickr/dist/plugins/weekSelect/weekSelect';
import * as moment_ from 'moment';
import {Moment} from 'moment';

const moment = moment_;

export interface FlatpickrOutputOptions {
  selectedDates: Moment[];
  dateString: string;
  instance: any;
}

export interface FlatpickrDayCreateOutputOptions extends FlatpickrOutputOptions {
  dayElement: HTMLElement;
}

@Directive({
  selector: '[ngxFlatpickr]',
  exportAs: 'flatpickr',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgxFlatpickrDirective)
    }
  ]
})
export class NgxFlatpickrDirective implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {

  /**
   * Exactly the same as date format, but for the altInput field.
   */
  @Input() altFormat: string;
  /**
   *  Show the user a readable date (as per altFormat), but return something totally different to the server.
   */
  @Input() altInput: boolean;
  /**
   * This class will be added to the input element created by the altInput option.
   * Note that `altInput` already inherits classes from the original input.
   */
  @Input() altInputClass: string;
  /**
   * Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
   */
  @Input() allowInput: boolean;
  /**
   * Instead of `body`, appends the calendar to the specified node instead.
   */
  @Input() appendTo: HTMLElement;
  /**
   * Defines how the date will be formatted in the aria-label for calendar days, using the same tokens as dateFormat.
   * If you change this, you should choose a value that will make sense if a screen reader reads it out loud.
   */
  @Input() ariaDateFormat?: string;
  /**
   * Defines how the dates will be separated when mode is set to be multiple
   */
  @Input() conjunction: string;
  /**
   * Whether clicking on the input should open the picker.
   * You could disable this if you wish to open the calendar manually `with.open()`.
   */
  @Input() clickOpens: boolean;
  /**
   * A string of characters which are used to define how the date will be displayed in the input box.
   * The supported characters are defined in the table below.
   */
  @Input() dateFormat: string;
  /**
   * Initial value of the hour element.
   */
  @Input() defaultHour?: number;
  /**
   * Initial value of the minute element.
   */
  @Input() defaultMinute?: number;
  /**
   * See <a href="https://chmln.github.io/flatpickr/examples/#disabling-specific-dates">disabling dates</a>.
   */
  @Input() disable: FlatpickrDisableEnableDate[];
  /**
   * Set disableMobile to true to always use the non-native picker.
   * By default, Flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
   */
  @Input() disableMobile: boolean;
  /**
   * See <a href="https://chmln.github.io/flatpickr/examples/#disabling-all-dates-except-select-few">enabling dates</a>.
   */
  @Input() enable: FlatpickrDisableEnableDate[];
  /**
   * Enables time picker.
   */
  @Input() enableTime: boolean;
  /**
   * Enables seconds in the time picker.
   */
  @Input() enableSeconds: boolean;
  /**
   * Allows using a custom date formatting function instead of the built-in handling for date formats using dateFormat, altFormat, etc.
   */
  @Input() formatDate?: (value: any) => string;
  /**
   * Adjusts the step for the hour input (incl. scrolling).
   */
  @Input() hourIncrement: number;
  /**
   * Displays the calendar inline.
   */
  @Input() inline: boolean;
  /**
   * Dates that will be marked (contains class name flatpickr-marked).
   */
  @Input() markedDates: string[] | Date[] | Moment[];
  /**
   * The maximum date that a user can pick to (inclusive).
   */
  @Input() maxDate: string | Date;
  /**
   * The minimum date that a user can start picking from (inclusive).
   */
  @Input() minDate: string | Date;
  /**
   * Adjusts the step for the minute input (incl. scrolling).
   */
  @Input() minuteIncrement: number;
  /**
   * Select a single date, multiple dates or a date range.
   */
  @Input() mode: 'single' | 'multiple' | 'range';
  /**
   * HTML for the arrow icon, used to switch months.
   */
  @Input() nextArrow: string;
  /**
   * Hides the day selection in calendar. Use it along with `enableTime` to create a time picker.
   */
  @Input() noCalendar: boolean;
  /**
   * Function that expects a date string and must return a Date object.
   */
  @Input() parseDate: (str: string) => Date;
  /**
   * HTML for the left arrow icon.
   */
  @Input() prevArrow: string;
  /**
   * Show the month using the shorthand version (ie, Sep instead of September).
   */
  @Input() shorthandCurrentMonth: boolean;
  /**
   * Position the calendar inside the wrapper and next to the input element. (Leave `false` unless you know what you're doing).
   */
  @Input() static: boolean;
  /**
   * Displays time picker in 24 hour mode without AM/PM selection when enabled.
   */
  @Input() time_24hr: boolean;
  /**
   * Enables display of week numbers in calendar.
   */
  @Input() weekNumbers: boolean;
  /**
   * You may override the function that extracts the week numbers from a Date by supplying a getWeek function.
   * It takes in a date as a parameter and should return a corresponding string that you want to appear left of every week.
   */
  @Input() getWeek: (date: Date) => string;
  /**
   * Custom elements and input groups.
   */
  @Input() wrap: boolean;
  /**
   * Array of plugin instances to use.
   */
  @Input() plugins: any[];
  /**
   * The locale object or string to use for the locale.
   */
  @Input() locale: object | string;
  /**
   * Auto convert the ngModel value from a string to a date / array of dates / from - to date object depending on the `mode`
   */
  @Output()
  flatpickrReady: EventEmitter<FlatpickrOutputOptions> = new EventEmitter();
  /**
   * Gets triggered when the user selects a date, or changes the time on a selected date.
   */
  @Output()
  flatpickrChange: EventEmitter<FlatpickrOutputOptions> = new EventEmitter();
  /**
   * Gets triggered when the input value is updated with a new date string.
   */
  @Output()
  flatpickrValueUpdate: EventEmitter<FlatpickrOutputOptions> = new EventEmitter();
  /**
   * Gets triggered when the calendar is opened.
   */
  @Output()
  flatpickrOpen: EventEmitter<FlatpickrOutputOptions> = new EventEmitter();
  /**
   * Gets triggered when the calendar is closed.
   */
  @Output()
  flatpickrClose: EventEmitter<FlatpickrOutputOptions> = new EventEmitter();
  /**
   * Gets triggered when the month is changed, either by the user or programmatically.
   */
  @Output()
  flatpickrMonthChange: EventEmitter<FlatpickrOutputOptions> = new EventEmitter();
  /**
   * Gets triggered when the year is changed, either by the user or programmatically.
   */
  @Output()
  flatpickrYearChange: EventEmitter<FlatpickrOutputOptions> = new EventEmitter();
  /**
   * Take full control of every date cell with this output
   */
  @Output()
  flatpickrDayCreate: EventEmitter<FlatpickrDayCreateOutputOptions> = new EventEmitter();

  @Output()
  onChange: EventEmitter<Moment | Moment[] | { start: Moment, end: Moment }> = new EventEmitter();


  private instance: flatpickr.Instance;
  private isDisabled = false;
  private initialValue: any;
  private onChangeFn: (value: any) => void = () => {
  }; // tslint:disable-line
  private onTouchedFn = () => {
  }; // tslint:disable-line

  constructor(
    private config: FlatpickrConfig,
    private elm: ElementRef,
    private renderer: Renderer2
  ) {
  }

  // tslint:disable-next-line
  static convertFormat(key: string, value: any) {
    if (value instanceof moment) {
      return new Date(value.valueOf());
    }
    if (key === 'enable' || key === 'disable') {
      return value.map(v => new Date(moment(v).valueOf()));
    }
    if (key.includes('Format')) {
      return momentToFpDateFormat(value);
    }
    if (key === 'plugins') {
      return NgxFlatpickrDirective.parsePlugins(value);
    }
    return value;
  }

  // tslint:disable-next-line
  static parseDates(d: any, format?: string): Moment[] | Moment {
    if (d instanceof Array) {
      return d.map((date: any) => format ? moment(date, format) : moment(date));
    }

    if (d instanceof Date || typeof(d) === 'string') {
      return format ? moment(d, format) : moment(d);
    }
  }

  static parsePlugins(plugins: string[]) {
    let _plugins = [];
    if (plugins) {
      plugins.forEach(p => {
        switch (p) {
          case 'weekSelect':
            _plugins = [
              ..._plugins,
              weekSelectPlugin()
            ];
            break;
        }
      });
    }
    return _plugins;
  }

  @HostListener('blur')
  onBlur() {
    this.onTouchedFn();
  }

  writeValue(value: any): void {
    let parsedValue: any = value;
    if (value) {
      switch (this.mode) {
        case 'range':
          parsedValue = [];
          if (value) {
            if (value.start) {
              parsedValue[0] = new Date(moment(value.start).valueOf());
            }
            if (value.end) {
              parsedValue[1] = new Date(moment(value.end).valueOf());
            }
          }
          break;
        case 'multiple':
          parsedValue = value.map(d => new Date(moment(d).valueOf()));
          break;
        case 'single':
        default:
          parsedValue = new Date(moment(value).valueOf());
      }
    }

    if (this.instance) {
      this.instance.setDate(parsedValue);
    } else {
      this.initialValue = parsedValue;
    }
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
        this.renderer.setProperty(this.instance._input, 'disabled', 'disabled');
      } else {
        this.renderer.removeAttribute(this.instance._input, 'disabled');
      }
    }
  }

  ngAfterViewInit(): void {
    let options: any = {
      altFormat: this.altFormat,
      altInput: this.altInput,
      altInputClass: this.altInputClass,
      allowInput: this.allowInput,
      appendTo: this.appendTo,
      ariaDateFormat: this.ariaDateFormat,
      conjunction: this.conjunction,
      clickOpens: this.clickOpens,
      dateFormat: this.dateFormat,
      defaultHour: this.defaultHour,
      defaultMinute: this.defaultMinute,
      disable: this.disable,
      disableMobile: this.disableMobile,
      enable: this.enable,
      enableTime: this.enableTime,
      enableSeconds: this.enableSeconds,
      formatDate: this.formatDate,
      hourIncrement: this.hourIncrement,
      defaultDate: this.initialValue,
      inline: this.inline,
      maxDate: this.maxDate,
      minDate: this.minDate,
      minuteIncrement: this.minuteIncrement,
      mode: this.mode,
      nextArrow: this.nextArrow,
      noCalendar: this.noCalendar,
      parseDate: this.parseDate,
      prevArrow: this.prevArrow,
      shorthandCurrentMonth: this.shorthandCurrentMonth,
      static: this.static,
      time_24hr: this.time_24hr,
      weekNumbers: this.weekNumbers,
      getWeek: this.getWeek,
      wrap: this.wrap
    };
    if (this.locale) {
      options.locale = this.locale;
    }
    Object.keys(options).forEach((key: string) => {
      if (typeof options[key] === 'undefined') {
        options[key] = (this.config as any)[key];
      }
      this[key] = options[key];
      options[key] = NgxFlatpickrDirective.convertFormat(key, options[key]);
    });
    options = {
      ...options,
      plugins: NgxFlatpickrDirective.parsePlugins(this.plugins),
      onChange: (_dates: Date[], dateString: string, instance: any) => {
        const selectedDates = <Moment[]>NgxFlatpickrDirective.parseDates(_dates);
        this.flatpickrChange.emit({selectedDates, dateString, instance});
      },
      onOpen: (_dates: Date[], dateString: string, instance: any) => {
        const selectedDates = <Moment[]>NgxFlatpickrDirective.parseDates(_dates);
        this.flatpickrOpen.emit({selectedDates, dateString, instance});
      },
      onClose: (_dates: Date[], dateString: string, instance: any) => {
        const selectedDates = <Moment[]>NgxFlatpickrDirective.parseDates(_dates);
        this.flatpickrClose.emit({selectedDates, dateString, instance});
      },
      onMonthChange: (_dates: Date[], dateString: string, instance: any) => {
        const selectedDates = <Moment[]>NgxFlatpickrDirective.parseDates(_dates);
        this.flatpickrMonthChange.emit({selectedDates, dateString, instance});
      },
      onYearChange: (_dates: Date[], dateString: string, instance: any) => {
        const selectedDates = <Moment[]>NgxFlatpickrDirective.parseDates(_dates);
        this.flatpickrYearChange.emit({selectedDates, dateString, instance});
      },
      onReady: (_dates: Date[], dateString: string, instance: any) => {
        const selectedDates = <Moment[]>NgxFlatpickrDirective.parseDates(_dates);
        this.flatpickrReady.emit({selectedDates, dateString, instance});
      },
      onValueUpdate: (_dates: Date[], dateString: string, instance: any) => {
        const selectedDates = <Moment[]>NgxFlatpickrDirective.parseDates(_dates);
        this.flatpickrValueUpdate.emit({selectedDates, dateString, instance});
      },
      onDayCreate: (_dates: Date[], dateString: string, instance: any, dayElement: HTMLElement) => {
        if (this.markedDates && this.markedDates.length) {
          if ((this.markedDates as any).indexOf(moment((dayElement as any).dateObj).startOf('d').valueOf()) > -1) {
            dayElement.innerHTML += `<span class="flatpickr-marked"></span>`;
          }
        }
        const selectedDates = <Moment[]>NgxFlatpickrDirective.parseDates(_dates);
        this.flatpickrDayCreate.emit({selectedDates, dateString, instance, dayElement});
      }
    };
    this.instance = flatpickr(this.elm.nativeElement, options) as flatpickr.Instance;
    this.setDisabledState(this.isDisabled);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instance) {
      Object.keys(changes).forEach((key: any) => {
        const value = NgxFlatpickrDirective.convertFormat(key, this[key]);
        this.instance.set(key, value);
      });
    }
    if (this.markedDates && this.markedDates.length) {
      this.markedDates = (this.markedDates as any).map(d => {
        if (!isNaN(d)) {
          d = +d;
        }
        return moment(d).startOf('d').valueOf();
      });

      if (this.instance) {
        this.instance.redraw();
      }
    }
  }

  ngOnDestroy(): void {
    this.instance.destroy();
  }

  @HostListener('input')
  inputChanged(): void {
    const value: string = this.elm.nativeElement.value;
    let parsedValues: Moment | Moment[] | { start: Moment, end: Moment };
    let isValid = true;
    if (typeof value === 'string') {
      switch (this.mode) {
        case 'multiple':
          parsedValues = <Moment[]>NgxFlatpickrDirective.parseDates(value.split(this.conjunction), this.dateFormat);
          parsedValues.forEach(d => {
            if (!moment(d).isValid()) {
              isValid = false;
            }
          });
          break;
        case 'range':
          const [start, end] = <Moment[]>NgxFlatpickrDirective.parseDates(value.split(this.instance.l10n.rangeSeparator), this.dateFormat);
          parsedValues = {start: null, end: null};
          if (start && start.isValid()) {
            parsedValues.start = start;
            parsedValues.end = (end && end.isValid()) ? end : start;
          }
          break;
        case 'single':
        default:
          parsedValues = <Moment>NgxFlatpickrDirective.parseDates(value, this.dateFormat);
          isValid = moment(parsedValues).isValid();
      }
    } else {
      parsedValues = <Moment>NgxFlatpickrDirective.parseDates(value);
      isValid = moment(parsedValues).isValid();
    }
    this.onChangeFn(isValid ? parsedValues : null);
    this.onChange.emit(isValid ? parsedValues : null);
  }
}
