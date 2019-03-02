import {Component, OnInit} from '@angular/core';
import {EventInput} from '@fullcalendar/core/structs/event';

// import * as faker from 'faker';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// function events(n = 100): EventInput[] {
//   return Array(n).fill(0).map(() => {
//
//     return {
//       start: moment().startOf('w').toISOString(),
//     };
//   });
// }

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events: EventInput[] = [{'title': 'Conference', 'start': '2019-02-24', 'end': '2019-02-26'}, {
    'title': 'Meeting',
    'start': '2019-02-25T10:30:00+00:00',
    'end': '2019-02-25T12:30:00+00:00',
    extendedProps: {
      html: 'adssad'
    }
  }, {'title': 'Lunch', 'start': '2019-02-25T12:00:00+00:00'}, {
    'title': 'Birthday Party',
    'start': '2019-02-26T07:00:00+00:00'
  }, {'url': 'http:\/\/google.com\/', 'title': 'Click for Google', 'start': '2019-02-28'}];

  ngOnInit() {
    // const start = faker.date.soon(3);
    // console.log(start);
    // events();
  }

}
