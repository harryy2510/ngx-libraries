import {Component, OnInit, ViewChild} from '@angular/core';
import * as faker from 'faker';
import {AvatarConfig} from '../../projects/ngx-avatar/src/lib/ngx-avatar.service';
import * as moment from 'moment';
import {NgxRolesService} from '../../projects/ngx-roles/src/lib/ngx-roles.service';
import {Role, RoleType} from '../../projects/ngx-roles/src/lib/protos/appointy.go.roles.service';
import {FormControl} from '@angular/forms';
import {concat, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {NgxRightsService} from '../../projects/ngx-rights/src/lib/ngx-rights.service';
import 'moment-timezone';
import {catchError, debounceTime, delay, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

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
  bank = '';
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
  private banks2: any[] = [
    {name: 'Bank A (Switzerland)', id: 0},
    {name: 'Bank B (Switzerland)', id: 1},
    {name: 'Bank C (France)', id: 2},
    {name: 'Bank D (France)', id: 3},
    {name: 'Bank E (France)', id: 4},
    {name: 'Bank F (Italy)', id: 5},
    {name: 'Bank G (Italy)', id: 6}
  ];




  people3$: Observable<any[]>;
  people3Loading = false;
  people3input$ = new Subject<string>();
  selectedPersons: any[] = <any>[];



  constructor(private _rightsService: NgxRightsService, private _rolesService: NgxRolesService) {
    this._rightsService.setRights(this.rights);
    this._rolesService.role = this.role;
    moment.tz.setDefault('America/Chicago');
    this.time = moment();
    this.date2 = moment();
    this.loadPeople3();
  }

  private loadPeople3() {
    this.people3$ = concat(
      of([]),
      this.people3input$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.people3Loading = true),
        switchMap(term => this.getPeople(term).pipe(
          catchError(() => of([])),
          tap(() => this.people3Loading = false)
        ))
      )
    );
  }

  getPeople(term: string = null): Observable<any[]> {
    let items = getMockPeople();
    if (term) {
      items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(200));
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
    for (let i = 0; i < 50; i++) {
      const _avatar: AvatarConfig = {
        size: faker.random.number(20) + 40,
        name: faker.name.firstName(),
        image: faker.random.arrayElement(['', faker.image.avatar()]),
        textColor: faker.random.arrayElement(['', faker.internet.color()]),
        bgColor: faker.random.arrayElement(['', faker.internet.color()]),
        label: faker.random.arrayElement(['', 'Active', 'Inactive']),
        zoom: faker.random.boolean(),
        upload: faker.random.boolean(),
        rounded: faker.random.boolean(),
        disabled: faker.random.boolean(),
        margin: faker.random.number(10)
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

function getMockPeople() {
  return [
    {
      'id': '5a15b13c36e7a7f00cf0d7cb',
      'index': 2,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 23,
      'name': 'Karyn Wright',
      'gender': 'female',
      'company': 'ZOLAR',
      'email': 'karynwright@zolar.com',
      'phone': '+1 (851) 583-2547'
    },
    {
      'id': '5a15b13c2340978ec3d2c0ea',
      'index': 3,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 35,
      'name': 'Rochelle Estes',
      'disabled': true,
      'gender': 'female',
      'company': 'EXTRAWEAR',
      'email': 'rochelleestes@extrawear.com',
      'phone': '+1 (849) 408-2029'
    },
    {
      'id': '5a15b13c663ea0af9ad0dae8',
      'index': 4,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'name': 'Mendoza Ruiz',
      'gender': 'male',
      'company': 'ZYTRAX',
      'email': 'mendozaruiz@zytrax.com',
      'phone': '+1 (904) 536-2020'
    },
    {
      'id': '5a15b13cc9eeb36511d65acf',
      'index': 5,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 39,
      'name': 'Rosales Russell',
      'gender': 'male',
      'company': 'ELEMANTRA',
      'email': 'rosalesrussell@elemantra.com',
      'phone': '+1 (868) 473-3073'
    },
    {
      'id': '5a15b13c728cd3f43cc0fe8a',
      'index': 6,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 32,
      'name': 'Marquez Nolan',
      'gender': 'male',
      'company': 'MIRACLIS',
      'disabled': true,
      'email': 'marqueznolan@miraclis.com',
      'phone': '+1 (853) 571-3921'
    },
    {
      'id': '5a15b13ca51b0aaf8a99c05a',
      'index': 7,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 28,
      'name': 'Franklin James',
      'gender': 'male',
      'company': 'CAXT',
      'email': 'franklinjames@caxt.com',
      'phone': '+1 (868) 539-2984'
    },
    {
      'id': '5a15b13cc3b9381ffcb1d6f7',
      'index': 8,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 24,
      'name': 'Elsa Bradley',
      'gender': 'female',
      'company': 'MATRIXITY',
      'email': 'elsabradley@matrixity.com',
      'phone': '+1 (994) 583-3850'
    },
    {
      'id': '5a15b13ce58cb6ff62c65164',
      'index': 9,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 40,
      'name': 'Pearson Thompson',
      'gender': 'male',
      'company': 'EZENT',
      'email': 'pearsonthompson@ezent.com',
      'phone': '+1 (917) 537-2178'
    },
    {
      'id': '5a15b13c90b95eb68010c86e',
      'index': 10,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 32,
      'name': 'Ina Pugh',
      'gender': 'female',
      'company': 'MANTRIX',
      'email': 'inapugh@mantrix.com',
      'phone': '+1 (917) 450-2372'
    },
    {
      'id': '5a15b13c2b1746e12788711f',
      'index': 11,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'name': 'Nguyen Elliott',
      'gender': 'male',
      'company': 'PORTALINE',
      'email': 'nguyenelliott@portaline.com',
      'phone': '+1 (905) 491-3377'
    },
    {
      'id': '5a15b13c605403381eec5019',
      'index': 12,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 31,
      'name': 'Mills Barnett',
      'gender': 'male',
      'company': 'FARMEX',
      'email': 'millsbarnett@farmex.com',
      'phone': '+1 (882) 462-3986'
    },
    {
      'id': '5a15b13c67e2e6d1a3cd6ca5',
      'index': 13,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 36,
      'name': 'Margaret Reynolds',
      'gender': 'female',
      'company': 'ROOFORIA',
      'email': 'margaretreynolds@rooforia.com',
      'phone': '+1 (935) 435-2345'
    },
    {
      'id': '5a15b13c947c836d177aa85c',
      'index': 14,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 29,
      'name': 'Yvette Navarro',
      'gender': 'female',
      'company': 'KINETICA',
      'email': 'yvettenavarro@kinetica.com',
      'phone': '+1 (807) 485-3824'
    },
    {
      'id': '5a15b13c5dbbe61245c1fb73',
      'index': 15,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 20,
      'name': 'Elisa Guzman',
      'gender': 'female',
      'company': 'KAGE',
      'email': 'elisaguzman@kage.com',
      'phone': '+1 (868) 594-2919'
    },
    {
      'id': '5a15b13c38fd49fefea8db80',
      'index': 16,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 33,
      'name': 'Jodie Bowman',
      'gender': 'female',
      'company': 'EMTRAC',
      'email': 'jodiebowman@emtrac.com',
      'phone': '+1 (891) 565-2560'
    },
    {
      'id': '5a15b13c9680913c470eb8fd',
      'index': 17,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 24,
      'name': 'Diann Booker',
      'gender': 'female',
      'company': 'LYRIA',
      'email': 'diannbooker@lyria.com',
      'phone': '+1 (830) 555-3209'
    }
  ]
}
