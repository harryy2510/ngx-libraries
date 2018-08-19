import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {NgxAvatarComponent} from './ngx-avatar.component';
import {AvatarConfig} from './ngx-avatar.service';

export const AVATAR_CONFIG = new InjectionToken('Avatar Config');

export function defaultsFactory(config) {
  return {...new AvatarConfig(), ...config};
}

@NgModule({
  imports: [],
  declarations: [NgxAvatarComponent],
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

