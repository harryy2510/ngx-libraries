import {Component, OnInit} from '@angular/core';
import {NgxRightsService} from 'ngx-rights';
import * as faker from 'faker';
import {AvatarConfig} from '../../projects/ngx-avatar/src/lib/ngx-avatar.service';
import * as moment from 'moment';
import {NgxRolesService} from '../../projects/ngx-roles/src/lib/ngx-roles.service';
import {Role, RoleType} from '../../projects/ngx-roles/src/lib/protos/appointy.go.roles.service';

@Component({
  selector: 'lib-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  date = moment();
  min = moment().add(2, 'd');
  time = moment();
  rights = ['**/service-providers/{service_provider_id.id}/**/*', '!**/service-providers/{service_provider_id.id}/certificates/*'];
  tests = [
    '/programs/program_id/locations/location_id/divisions/division_id/service-providers/{service_provider_id.id}/appointments',
    '/programs/{service_provider_id.base.program_id}/service-providers/{service_provider_id.id}/certificates/{id}',
    '/programs/{base.program_id}/channels/{id}',
    '/programs/{class.base.program_id}/locations/{class.base.location_id}/divisions/{class.base.division_id}/users/{user_id}/classes/{class.id}'
  ];

  role: Role = {
    serviceProvider: {
      type: RoleType.SERVICE_PROVIDER,
      programId: '',
      serviceProviderId: ''
    }
  };

  avatars = [];

  constructor(private _rightsService: NgxRightsService, private _rolesService: NgxRolesService) {
    this._rightsService.setRights(this.rights);
    this._rolesService.role = this.role;
  }

  ngOnInit() {
    this.avatars = [];
    for (let i = 0; i < 10; i++) {
      const _avatar: AvatarConfig = {
        name: faker.name.firstName(),
        image: faker.random.arrayElement(['', faker.image.avatar()]),
        bgColor: faker.random.arrayElement(['', faker.internet.color()]),
        label: faker.random.arrayElement(['', 'Active', 'Inactive']),
        upload: true
      };
      this.avatars = [
        ...this.avatars,
        _avatar
      ];
    }
  }

  change($event) {
    console.log($event);
  }

}
