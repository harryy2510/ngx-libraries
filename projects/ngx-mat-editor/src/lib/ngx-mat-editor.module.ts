import {NgModule} from '@angular/core';
import {NgxMatEditorComponent} from './ngx-mat-editor.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [NgxMatEditorComponent],
  imports: [
    CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,
    EditorModule
  ],
  exports: [NgxMatEditorComponent]
})
export class NgxMatEditorModule {
}
