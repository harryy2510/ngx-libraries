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
import {NgxRightsModule} from '../../projects/ngx-rights/src/lib/ngx-rights.module';
import {NgxMatSelectModule} from '../../projects/ngx-mat-select/src/lib/ngx-mat-select.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule, MatInputModule} from '@angular/material';

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
    NgxMatSelectModule,
    MatFormFieldModule,
    MatInputModule
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
