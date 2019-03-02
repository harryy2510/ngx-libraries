import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgxCalendarComponent} from './ngx-calendar.component';
import {NgxCalendarService} from './ngx-calendar.service';

@NgModule({
  declarations: [NgxCalendarComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxCalendarComponent],
  providers: [NgxCalendarService]
})
export class NgxCalendarModule {
}
