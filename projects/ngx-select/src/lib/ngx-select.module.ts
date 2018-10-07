import {NgModule} from '@angular/core';
import {NgxSelectComponent} from './ngx-select.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [NgxSelectComponent],
  exports: [NgxSelectComponent, MatButtonModule,
    MatIconModule,
    MatInputModule, MatSelectModule]
})
export class NgxSelectModule {
}
