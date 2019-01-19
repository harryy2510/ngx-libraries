import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ListKeyManagerOption} from '@angular/cdk/a11y';

@Component({
  selector: 'ngx-speed-dial-option',
  styleUrls: [`ngx-speed-dial-option.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button tabindex="-1" [class.mat-focused]="isActive" mat-mini-fab color="primary">
      <mat-icon>add</mat-icon>
    </button>
  `
})
export class NgxSpeedDialOptionComponent implements OnInit, ListKeyManagerOption {

  isActive: boolean;

  private _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }

  ngOnInit() {
    this.isActive = false;
  }

  setActive(val) {
    this.isActive = val;
    console.log(val);
  }

  selectItem() {
    console.log('select');
  }


}
