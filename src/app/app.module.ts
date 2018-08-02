import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NgxTimepickerModule} from '../../projects/ngx-timepicker/src/lib/ngx-timepicker.module';
import {NgxFlatpickrModule} from '../../projects/ngx-flatpickr/src/lib/ngx-flatpickr.module';
import {NgxRightsModule} from 'ngx-rights';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxFlatpickrModule.forRoot(),
    NgxTimepickerModule.forRoot(),
    NgxRightsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
