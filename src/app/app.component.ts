import {Component} from '@angular/core';
import {NgxRightsService} from 'ngx-rights';

@Component({
  selector: 'lib-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date = '';
  time = '';
  rights = ['**/service-providers/{service_provider_id.id}/**/*', '!**/service-providers/{service_provider_id.id}/certificates/*'];
  tests = [
    '/programs/program_id/locations/location_id/divisions/division_id/service-providers/{service_provider_id.id}/appointments',
    '/programs/{service_provider_id.base.program_id}/service-providers/{service_provider_id.id}/certificates/{id}',
    '/programs/{base.program_id}/channels/{id}',
    '/programs/{class.base.program_id}/locations/{class.base.location_id}/divisions/{class.base.division_id}/users/{user_id}/classes/{class.id}'
  ];

  constructor(private _rightsService: NgxRightsService) {
    this._rightsService.setRights(this.rights);
  }

}
