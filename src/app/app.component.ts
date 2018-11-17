import {Component, OnInit, ViewChild} from '@angular/core';
import * as faker from 'faker';
import {AvatarConfig} from '../../projects/ngx-avatar/src/lib/ngx-avatar.service';
import * as moment from 'moment';
import {NgxRolesService} from '../../projects/ngx-roles/src/lib/ngx-roles.service';
import {Role, RoleType} from '../../projects/ngx-roles/src/lib/protos/appointy.go.roles.service';
import {FormControl} from '@angular/forms';
import {ReplaySubject} from 'rxjs';
import {NgxRightsService} from '../../projects/ngx-rights/src/lib/ngx-rights.service';
import 'moment-timezone';

@Component({
  selector: 'lib-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  date
  min = moment().startOf('d').add(2, 'd');
  date2;
  time;

  rights = {
    userId: 'dfdsf',
    allowed: [{
      resource: '**/service-providers/{service_provider_id.id}/**/*',
      values: [1, 2, 3, 4]
    }, {resource: '!**/service-providers/{service_provider_id.id}/certificates/*', values: [1, 2, 3, 4]}],
    notAllowed: []
  };
  tests = [
    '/programs/program_id/locations/location_id/divisions/division_id/service-providers/{service_provider_id.id}/appointments',
    '/programs/{service_provider_id.base.program_id}/service-providers/{service_provider_id.id}/certificates/{id}',
    '/programs/{base.program_id}/channels/{id}',
    '/programs/{class.base.program_id}/locations/{class.base.location_id}/divisions/{class.base.division_id}/users/{user_id}/classes/{class.id}'
  ];

  formValues: any = {
    select: '',
    x: ''
  };

  markedDates = [moment(), moment().add(1, 'd'), moment().add(2, 'd')];

  role: Role = {
    serviceProvider: {
      type: RoleType.SERVICE_PROVIDER,
      programId: '',
      serviceProviderId: ''
    }
  };
  dsjfgsjfgjs = '';

  asdasds = 'J';

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();
  @ViewChild('dfsfsf') dfsfsf: any;

  // /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  //
  // /** list of banks filtered by search keyword for multi-selection */
  public filteredBanksMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  avatars = [];
  bank = 'K';
  /** list of banks */
  private banks: any[] = [
    {name: 'Bank A (Switzerland)', id: 'A'},
    {name: 'Bank B (Switzerland)', id: 'B'},
    {name: 'Bank C (France)', id: 'C'},
    {name: 'Bank D (France)', id: 'D'},
    {name: 'Bank E (France)', id: 'E'},
    {name: 'Bank F (Italy)', id: 'F'},
    {name: 'Bank G (Italy)', id: 'G'},
    {name: 'Bank H (Italy)', id: 'H'},
    {name: 'Bank I (Italy)', id: 'I'},
    {name: 'Bank J (Italy)', id: 'J'},
    {name: 'Bank Kolombia (United States of America)', id: 'K'},
    {name: 'Bank L (Germany)', id: 'L'},
    {name: 'Bank M (Germany)', id: 'M'},
    {name: 'Bank N (Germany)', id: 'N'},
    {name: 'Bank O (Germany)', id: 'O'},
    {name: 'Bank P (Germany)', id: 'P'},
    {name: 'Bank Q (Germany)', id: 'Q'},
    {name: 'Bank R (Germany)', id: 'R'},
  ];

  constructor(private _rightsService: NgxRightsService, private _rolesService: NgxRolesService) {
    this._rightsService.setRights(this.rights);
    this._rolesService.role = this.role;
    moment.tz.setDefault('America/Chicago');
    this.time = moment();
    this.date2 = moment();
  }

  onDateChange(e) {
    setTimeout(() => {

      console.log(moment(e.selectedDates[0]).format());
      console.log(moment(this.date).format())
      console.log(moment(e.selectedDates[0]).endOf('d').format());
      console.log(moment(this.date).endOf('d').format())
    }, 300);

  }

  onChange($event) {
    console.log($event);
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

    setTimeout(() => {
      this.markedDates = [
        ...this.markedDates
      ]
    });

    this.filteredBanks.next(this.banks.slice());
    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterBanks();
      });
  }

  mongthChange($event) {
    console.log($event);
    const m = $event.instance.currentMonth;

    setTimeout(() => {
      this.markedDates = [
        ...this.markedDates,
        moment().month(m).date(1),
        moment().month(m).date(3),
        moment().month(m).date(6),
        moment().month(m).date(10)
      ];
    }, 1000);

  }

  change($event) {
    console.log($event);
    console.log(moment($event).toISOString())
  }

  onSubmit(f) {
    console.log(f);
  }

  private filterBanks() {
    if (!this.banks) {
      return;
    }

    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
