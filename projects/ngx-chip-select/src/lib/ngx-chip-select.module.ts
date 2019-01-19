import {NgModule} from '@angular/core';
import {NgxChipSelectComponent} from './ngx-chip-select.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatListModule} from '@angular/material';
import {SatPopoverModule} from '@ncstate/sat-popover';


@NgModule({
  declarations: [NgxChipSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    SatPopoverModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [NgxChipSelectComponent]
})
export class NgxChipSelectModule {
}
