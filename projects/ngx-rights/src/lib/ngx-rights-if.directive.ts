import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ɵstringify as stringify
} from '@angular/core';
import {NgxRightsService, PatternUserRightTest} from './ngx-rights.service';

@Directive({
  selector: '[ngxRightsIf]'
})
export class NgxRightsIf implements OnInit {

  _test: PatternUserRightTest;
  private _thenTemplateRef: TemplateRef<any> | null = null;
  private _elseTemplateRef: TemplateRef<any> | null = null;
  private _thenViewRef: EmbeddedViewRef<any> | null = null;
  private _elseViewRef: EmbeddedViewRef<any> | null = null;

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<any>, private _rightsService: NgxRightsService, private _ref: ChangeDetectorRef) {
    this._thenTemplateRef = templateRef;
  }

  @Input()
  set ngxRightsIf(_test: PatternUserRightTest) {
    this._test = _test;
    this._updateView();
  }

  @Input()
  set ngxRightsIfElse(templateRef: TemplateRef<any> | null) {
    assertTemplate('ngxRightsIfElse', templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;
    this._updateView();
  }

  ngOnInit() {
    this._rightsService.rights.subscribe(() => {
      this._updateView();
    });
  }

  private _updateView() {
    if (this._rightsService.check(this._test)) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef =
            this._viewContainer.createEmbeddedView(this._thenTemplateRef);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef =
            this._viewContainer.createEmbeddedView(this._elseTemplateRef);
        }
      }
    }
    this._ref.markForCheck();
  }
}

function assertTemplate(property: string, templateRef: TemplateRef<any> | null): void {
  const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
  if (!isTemplateRefOrNull) {
    throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}
