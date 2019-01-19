import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Calendar} from 'fullcalendar';
// import 'fullcalendar/plugins/moment-timezone';


@Component({
  selector: 'ngx-calendar',
  template: ``,
  styleUrls: [`ngx-calendar.component.scss`],
  encapsulation: ViewEncapsulation.None
})
export class NgxCalendarComponent implements OnInit {

  calendar: Calendar;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.calendar = new Calendar(this.el.nativeElement, {
      defaultView: 'agendaDay',
      nowIndicator: true,
      timeZone: 'America/New_York',
      plugins: []
    });
    this.calendar.render();
  }

}
