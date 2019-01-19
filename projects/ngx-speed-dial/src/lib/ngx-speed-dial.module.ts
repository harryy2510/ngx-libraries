import {NgModule} from '@angular/core';
import {NgxSpeedDialComponent} from './ngx-speed-dial.component';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {CommonModule} from '@angular/common';
import {NgxSpeedDialOptionComponent} from './ngx-speed-dial-option.component';

@NgModule({
  declarations: [NgxSpeedDialComponent, NgxSpeedDialOptionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    A11yModule
  ],
  exports: [NgxSpeedDialComponent, NgxSpeedDialOptionComponent]
})
export class NgxSpeedDialModule {
}
