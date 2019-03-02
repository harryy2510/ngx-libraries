import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import EventApi from '@fullcalendar/core/api/EventApi';
import {DurationInput} from '@fullcalendar/core/datelib/duration';
import {DateInput} from '@fullcalendar/core/datelib/env';
import {PluginDef} from '@fullcalendar/core/plugin-system';
import {EventInput} from '@fullcalendar/core/structs/event';
import {OptionsInput, ToolbarInput} from '@fullcalendar/core/types/input-types';
import View from '@fullcalendar/core/View';
import timeGridPlugin from '@fullcalendar/timegrid';

export class NgxBusinessHoursInput {
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
}

export class NgxCalendarOptionsBase implements OptionsInput {
  @Input() allDaySlot = false;
  @Input() businessHours: NgxBusinessHoursInput[] | boolean;
  @Input() columnHeader = false;
  @Input() defaultDate: DateInput;
  @Input() defaultView = 'timeGridWeek';
  @Input() displayEventEnd: boolean;
  @Input() displayEventTime: boolean;
  @Input() eventBackgroundColor: string;
  @Input() eventBorderColor: string;
  @Input() eventClassName: string[] | string;
  @Input() eventClassNames: string[] | string;
  @Input() eventClick: (arg: { el: HTMLElement, event: EventApi, jsEvent: MouseEvent, view: View }) => boolean | void;
  @Input() eventColor: string;
  @Input() eventTextColor: string;
  @Input() events: EventInput[] = [];
  @Input() firstDay = 0;
  @Input() header: boolean | ToolbarInput = false;
  @Input() height: number | 'auto' | 'parent' | (() => number) = 'auto';
  @Input() hiddenDays: number[] = [];
  @Input() maxTime: DurationInput = {};
  @Input() minTime: DurationInput = {};
  @Input() now: DateInput | (() => DateInput);
  @Input() nowIndicator = true;
  @Input() plugins: (PluginDef | string)[] = [timeGridPlugin];
  @Input() scrollTime: DurationInput;
  @Input() slotDuration: DurationInput = {hour: 1};
  @Input() timeZone: string | boolean = 'UTC-coercion';
  @Input() weekends: boolean;

  private _options: OptionsInput = {};

  @Input()
  get options(): OptionsInput {
    return {
      allDaySlot: this.allDaySlot,
      businessHours: this.businessHours,
      columnHeader: this.columnHeader,
      defaultDate: this.defaultDate,
      defaultView: this.defaultView,
      eventClick: this.eventClick,
      eventRender: this.eventRender,
      eventSources: [{events: this.events}],
      firstDay: this.firstDay,
      header: this.header,
      height: this.height,
      hiddenDays: this.hiddenDays,
      minTime: this.minTime,
      maxTime: this.maxTime,
      nowIndicator: this.nowIndicator,
      plugins: this.plugins,
      slotDuration: this.slotDuration,
      timeZone: this.timeZone,
      ...this._options
    };
  };

  set options(value: OptionsInput) {
    this._options = value;
  };

  @Input() eventRender: (arg: { event: EventApi, el: HTMLElement, view: View }) => void = (arg) => {
    if (arg.event && arg.event.extendedProps && arg.event.extendedProps.html) {
      const el = document.createElement('div');
      el.innerHTML = arg.event.extendedProps.html;
      el.classList.add('fc-html');
      arg.el.querySelector('.fc-title').appendChild(el);
    }
  };
}


@Component({
  selector: 'ngx-calendar',
  template: ``,
  styleUrls: [`ngx-calendar.component.scss`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxCalendarComponent extends NgxCalendarOptionsBase implements AfterViewInit, OnDestroy, OnChanges {

  calendar: Calendar;

  constructor(private el: ElementRef) {
    super();
  }

  get isReady() {
    return (this.calendar && !this.calendar.isRendering);
  }

  ngAfterViewInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events) {
      this.removeAll();
      this.addSource(this.events);
    }
    if (changes.businessHours) {
      this.setOption('businessHours', this.businessHours);
    }
    if (changes.defaultDate) {
      this.gotoDate(this.defaultDate);
    }
  }

  gotoDate(value: DateInput): void {
    if (this.isReady) {
      this.calendar.gotoDate(value);
    }
  }

  setOption(name: keyof OptionsInput, value: any): void {
    if (this.isReady) {
      this.calendar.setOption(name, value);
    }
  }

  removeAll() {
    if (this.isReady) {
      this.calendar.removeAllEventSources();
    }
  }

  addSource(arg: EventInput | EventInput[]) {
    if (this.isReady) {
      this.calendar.addEventSource({events: this._coreceArray(arg)});
    }
  }

  add(arg: EventInput | EventInput[]) {
    if (this.isReady) {
      this._coreceArray(arg).forEach((e: EventInput) => this.calendar.addEvent(e));
    }
  }

  remove(arg: EventInput | EventInput[]) {
    if (this.isReady) {
      this._coreceArray(arg).forEach((e: EventInput) => {
        const eventApi = this.get(e.id);
        if (eventApi) {
          eventApi.remove();
        }
      });
    }
  }

  get(id: string | number): EventApi {
    if (this.isReady) {
      return this.calendar.getEventById(id.toString());
    }
  }

  initialize(): void {
    this.destroy();
    this.calendar = new Calendar(this.el.nativeElement, this.options);
    this.render();
  }

  render(): void {
    if (this.isReady) {
      this.calendar.render();
    }
  }

  destroy(): void {
    if (this.calendar) {
      this.calendar.destroy();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private _coreceArray<T>(arg: T | T[]): T[] {
    return Array.isArray(arg) ? arg : [arg];
  }

}
