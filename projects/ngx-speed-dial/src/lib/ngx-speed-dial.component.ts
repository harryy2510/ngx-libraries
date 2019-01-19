import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ListKeyManager} from '@angular/cdk/a11y';
import {DOWN_ARROW, ENTER, UP_ARROW} from '@angular/cdk/keycodes';
import {NgxSpeedDialOptionComponent} from './ngx-speed-dial-option.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'ngx-speed-dial',
  styleUrls: [`ngx-speed-dial.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ngx-speed-dial-option></ngx-speed-dial-option>
    <ng-template [ngIf]="isOpen">
      <ngx-speed-dial-option></ngx-speed-dial-option>
      <ngx-speed-dial-option></ngx-speed-dial-option>
      <ngx-speed-dial-option></ngx-speed-dial-option>
      <ngx-speed-dial-option></ngx-speed-dial-option>
      <ngx-speed-dial-option></ngx-speed-dial-option>
      <ngx-speed-dial-option></ngx-speed-dial-option>
      <ngx-speed-dial-option></ngx-speed-dial-option>
    </ng-template>
  `,
  host: {
    '(mouseenter)': '_onMouseEnter($event)',
    '(mouseleave)': '_onMouseLeave($event)',
    '(focus)': '_onFocus($event)',
    '(blur)': '_onBlur($event)',
    '(keyup)': '_onKeyUp($event)',
    'tabIndex': '0'
  }
})
export class NgxSpeedDialComponent implements AfterContentInit {

  @ViewChild('primaryButton') primaryButton: NgxSpeedDialOptionComponent;
  @ViewChildren(NgxSpeedDialOptionComponent) items: QueryList<NgxSpeedDialOptionComponent>;

  _keyManager: ListKeyManager<NgxSpeedDialOptionComponent>;

  destroyed$: Subject<boolean>;

  constructor(private _cdRef: ChangeDetectorRef) {
  }

  private _isOpen = false;

  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  private _focused = false;

  get focused(): boolean {
    return this._focused;
  }

  set focused(value: boolean) {
    this._focused = value;
  }

  _onMouseEnter(event) {
    this.open();
  }

  _onMouseLeave(event) {
    this.close();
  }

  _onFocus(event) {
    this.focused = true;
    this.open();
  }

  _onBlur(event) {
    this.focused = false;
    this.close();
  }

  _onKeyUp(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const isEnterKey = keyCode === ENTER;
    if (this._keyManager) {
      if (isArrowKey) {
        this._keyManager.onKeydown(event);
        return false;
      } else if (isEnterKey) {
        if (!this.isOpen) {
          this.open();
          return false;
        }
        this._keyManager.activeItem.selectItem();
        this.close(true);
        return false;
      }
    }
  }

  open(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
  }

  close(forced?: boolean): void {
    if (!this.isOpen || (this.focused && !forced)) {
      return;
    }
    this.isOpen = false;
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this._initKeyManager();
    })
  }

  detectChanges() {
    setTimeout(() => {
      if (!this._cdRef['destroyed']) {
        this._cdRef.markForCheck();
        this._cdRef.detectChanges();
      }
    });
  }

  private _initKeyManager() {
    this._keyManager = new ListKeyManager<NgxSpeedDialOptionComponent>(this.items)
      .withVerticalOrientation(true)
      .withWrap(true);

    // this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
    //   // Restore focus to the trigger before closing. Ensures that the focus
    //   // position won't be lost if the user got focus into the overlay.
    //   this.focus();
    //   this.close();
    // });

    // this._keyManager.
    this._keyManager.change.subscribe((e) => {
      console.log(e);
    });
  }


}
