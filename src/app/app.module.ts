import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NgxTimepickerModule} from '../../projects/ngx-timepicker/src/lib/ngx-timepicker.module';
import {NgxFlatpickrModule} from '../../projects/ngx-flatpickr/src/lib/ngx-flatpickr.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxFlatpickrModule.forRoot(),
    NgxTimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
