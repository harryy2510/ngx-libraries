import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ngx-custom-validators';
import {NgxFlatpickrModule} from '@harryy/ngx-flatpickr';
import {NgxTimepickerModule} from '@harryy/ngx-timepicker';
import {NgxTrumbowygModule} from '@harryy/ngx-trumbowyg';
import {NgSelectModule} from '@harryy/ng-select';
import {NgxPasswordToggleModule} from 'ngx-password-toggle';
import {
  MessagePipe,
  NgxCheckboxComponent,
  NgxDateComponent,
  NgxInputComponent,
  NgxPasswordComponent,
  NgxRadioComponent,
  NgxSelectComponent,
  NgxTextAreaComponent,
  NgxTimeComponent,
  NgxWysiwygComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxFlatpickrModule.forRoot(),
    NgxTimepickerModule.forRoot(),
    NgSelectModule,
    NgxPasswordToggleModule,
    NgxTrumbowygModule
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

