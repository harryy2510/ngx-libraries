import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxTimepickerModule} from '../../projects/ngx-timepicker/src/lib/ngx-timepicker.module';
import {NgxFlatpickrModule} from '../../projects/ngx-flatpickr/src/lib/ngx-flatpickr.module';
import {NgxAvatarModule} from '../../projects/ngx-avatar/src/lib/ngx-avatar.module';
import {NgxRolesModule} from '../../projects/ngx-roles/src/lib/ngx-roles.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxRightsModule} from '../../projects/ngx-rights/src/lib/ngx-rights.module';
import {NgxMatSelectModule} from '../../projects/ngx-mat-select/src/lib/ngx-mat-select.module';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import {NgxMatEditorModule} from '../../projects/ngx-mat-editor/src/lib/ngx-mat-editor.module';
import {TestComponent} from './test/test.component';
import {Test2Component} from './test2/test2.component';
import {RouterModule} from '@angular/router';
import {TableComponent} from './table/table.component';
import {NgxMatTableModule} from '../../projects/ngx-mat-table/src/lib/ngx-mat-table.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TableFixedSizeVirtualScroll} from './table/table-vs-strategy.service';
import {SelectComponent} from './select/select.component';
import {AvatarComponent} from './avatar/avatar.component';
import {SpeedDialComponent} from './speed-dial/speed-dial.component';
import {NgxSpeedDialModule} from '../../projects/ngx-speed-dial/src/lib/ngx-speed-dial.module';
import {CalendarComponent} from './calendar/calendar.component';
import {NgxCalendarModule} from '../../projects/ngx-calendar/src/lib/ngx-calendar.module';
import {NgxChipSelectModule} from '../../projects/ngx-chip-select/src/lib/ngx-chip-select.module';
import {ChipSelectComponent} from './chip-select/chip-select.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    Test2Component,
    TableComponent,
    TableFixedSizeVirtualScroll,
    SelectComponent,
    AvatarComponent,
    SpeedDialComponent,
    CalendarComponent,
    ChipSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFlatpickrModule.forRoot(),
    NgxTimepickerModule.forRoot(),
    NgxRightsModule.forRoot(),
    NgxAvatarModule.forRoot(),
    NgxRolesModule.forRoot(),
    BrowserAnimationsModule,
    NgxMatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatEditorModule,
    NgxMatTableModule,
    ScrollingModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'avatar',
        pathMatch: 'full'
      },
      {
        path: 'avatar',
        component: AvatarComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'speed-dial',
        component: SpeedDialComponent
      },
      {
        path: 'select',
        component: SelectComponent
      },
      {
        path: 'chip',
        component: ChipSelectComponent
      }
    ]),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    NgxSpeedDialModule,
    NgxCalendarModule,
    NgxChipSelectModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
