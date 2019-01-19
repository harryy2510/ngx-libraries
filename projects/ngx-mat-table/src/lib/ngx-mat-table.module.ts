import {NgModule} from '@angular/core';
import {NgxMatTableComponent} from './ngx-mat-table.component';
import {MatCheckboxModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [NgxMatTableComponent],
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxMatTableComponent,
    MatCheckboxModule
  ]
})
export class NgxMatTableModule {
}
