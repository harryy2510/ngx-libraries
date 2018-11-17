import {NgModule} from '@angular/core';
import {NgxMatSelectComponent} from './ngx-mat-select.component';
import {CommonModule} from '@angular/common';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  declarations: [NgxMatSelectComponent],
  exports: [NgxMatSelectComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'}
    }
  ]
})
export class NgxMatSelectModule {
}
