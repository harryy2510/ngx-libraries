import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {NgxAvatarComponent, NgxAvatarImgDialogComponent} from './ngx-avatar.component';
import {AvatarConfig} from './ngx-avatar.service';
import {MatDialogModule} from '@angular/material';

export const AVATAR_CONFIG = new InjectionToken('Avatar Config');

export function defaultsFactory(config) {
  return {...new AvatarConfig(), ...config};
}

@NgModule({
  imports: [MatDialogModule],
  declarations: [NgxAvatarComponent, NgxAvatarImgDialogComponent],
  entryComponents: [NgxAvatarImgDialogComponent],
  exports: [NgxAvatarComponent]
})
export class NgxAvatarModule {
  static forRoot(config: AvatarConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxAvatarModule,
      providers: [
        {
          provide: AVATAR_CONFIG,
          useValue: config
        },
        {
          provide: AvatarConfig,
          useFactory: defaultsFactory,
          deps: [AVATAR_CONFIG]
        }
      ]
    };
  }
}

