import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxTimepickerModule} from '../../projects/ngx-timepicker/src/lib/ngx-timepicker.module';
import {NgxFlatpickrModule} from '../../projects/ngx-flatpickr/src/lib/ngx-flatpickr.module';
import {NgxAvatarModule} from '../../projects/ngx-avatar/src/lib/ngx-avatar.module';
import {NgxRolesModule} from '../../projects/ngx-roles/src/lib/ngx-roles.module';
import {NgxTrumbowygModule} from '../../projects/ngx-trumbowyg/src/lib/ngx-trumbowyg.module';
import {NgxFormsModule} from '../../projects/ngx-forms/src/lib/ngx-forms.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSelectModule} from '../../projects/ngx-select/src/lib/ngx-select.module';
import {NgxRightsModule} from '../../projects/ngx-rights/src/lib/ngx-rights.module';

@NgModule({
  declarations: [
    AppComponent
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
    NgxTrumbowygModule,
    NgxFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
