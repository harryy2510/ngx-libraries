import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ɵstringify as stringify
} from '@angular/core';
import {NgxRolesService} from './ngx-roles.service';

@Directive({
  selector: '[ngxRolesIf]'
})
export class NgxRolesIfDirective implements OnInit {

  _test: string | string[];
  private _thenTemplateRef: TemplateRef<any> | null = null;
  private _elseTemplateRef: TemplateRef<any> | null = null;
  private _thenViewRef: EmbeddedViewRef<any> | null = null;
  private _elseViewRef: EmbeddedViewRef<any> | null = null;

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<any>, private _rolesService: NgxRolesService) {
    this._thenTemplateRef = templateRef;
  }

  @Input()
  set ngxRolesIf(_test: string | string[]) {
    this._test = _test;
    this._updateView();
  }

  @Input()
  set ngxRolesIfElse(templateRef: TemplateRef<any> | null) {
    assertTemplate('ngxRolesIfElse', templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;
    this._updateView();
  }

  ngOnInit() {
    this._rolesService.role$.subscribe(() => {
      this._updateView();
    });
  }

  private _updateView() {
    if (this._rolesService.check(this._test)) {
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
  }
}

function assertTemplate(property: string, templateRef: TemplateRef<any> | null): void {
  const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
  if (!isTemplateRefOrNull) {
    throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}
