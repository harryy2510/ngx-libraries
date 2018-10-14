import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {NgxSwitchComponent} from './components/switch/ngx-switch.component';
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {OverlayModule} from '@angular/cdk/overlay';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxFlatpickrModule.forRoot(),
    NgxTimepickerModule.forRoot(),
    NgSelectModule,
    NgxTrumbowygModule,
    NgxPasswordToggleModule,

    // Angular Material
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    A11yModule,
    OverlayModule,

  ],
  declarations: [
    NgxSwitchComponent,
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
    NgxSwitchComponent,
    NgxCheckboxComponent,
    NgxDateComponent,
    NgxInputComponent,
    NgxPasswordComponent,
    NgxRadioComponent,
    NgxSelectComponent,
    NgxTextAreaComponent,
    NgxTimeComponent,
    NgxWysiwygComponent,

    // Angular Material
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    A11yModule,
    OverlayModule,

  ]
})
export class NgxFormsModule {
}

