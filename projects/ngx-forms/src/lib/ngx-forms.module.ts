import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ngx-custom-validators';
import {NgxFlatpickrModule} from '@harryy/ngx-flatpickr';
import {NgxTimepickerModule} from '@harryy/ngx-timepicker';
import {NgxTrumbowygModule} from '@harryy/ngx-trumbowyg';
import {NgSelectModule} from '@harryy/ng-select';
import {NgxCheckboxComponent} from './components/checkbox/ngx-checkbox.component';
import {NgxDateComponent} from './components/date/ngx-date.component';
import {NgxInputComponent} from './components/input/ngx-input.component';
import {NgxPasswordComponent} from './components/password/ngx-password.component';
import {NgxRadioComponent} from './components/radio/ngx-radio.component';
import {NgxSelectComponent} from './components/select/ngx-select.component';
import {NgxTextAreaComponent} from './components/textarea/ngx-textarea.component';
import {NgxTimeComponent} from './components/time/ngx-time.component';
import {NgxWysiwygComponent} from './components/wysiwyg/ngx-wysiwyg.component';
import {MessagePipe} from './components/common/message.pipe';
import {NgxPasswordToggleModule} from 'ngx-password-toggle';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxFlatpickrModule.forRoot(),
    NgxTimepickerModule.forRoot(),
    NgSelectModule,
    NgxTrumbowygModule,
    NgxPasswordToggleModule
  ],
  declarations: [
    NgxCheckboxComponent,
    NgxDateComponent,
    NgxInputComponent,
    NgxPasswordComponent,
    NgxRadioComponent,
    NgxSelectComponent,
    NgxTextAreaComponent,
    NgxTimeComponent,
    NgxWysiwygComponent,
    MessagePipe
  ],
  exports: [
    NgxCheckboxComponent,
    NgxDateComponent,
    NgxInputComponent,
    NgxPasswordComponent,
    NgxRadioComponent,
    NgxSelectComponent,
    NgxTextAreaComponent,
    NgxTimeComponent,
    NgxWysiwygComponent
  ]
})
export class NgxFormsModule {
}

