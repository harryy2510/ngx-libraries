import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'lib-chip-select',
  templateUrl: './chip-select.component.html',
  styleUrls: ['./chip-select.component.scss']
})
export class ChipSelectComponent implements OnInit {


  data = [
    {
      'id': '7d1af734-681d-45d2-8875-b7e504d5a4e4',
      'name': 'Gerber',
      disabled: false
    },
    {
      'id': '03be8b8c-825b-4f13-8fd4-2ebd066d358d',
      'name': 'Carbonville',
      disabled: true
    },
    {
      'id': '91dbb722-2191-4dcd-8ecf-4dc63be0db2c',
      'name': 'Longbranch'
    }
  ];

  value = {
    'id': '7d1af734-681d-45d2-8875-b7e504d5a4e4',
    'name': 'Gerber'
  };

  constructor(private _ref: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  onChange($event) {
    this.data = [
      ...this.data.slice()
    ];
    this._ref.markForCheck();
  }

  labelFn = (item) => `${item.id} - ${item.name}`;

}
