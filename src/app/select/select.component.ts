import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  data = [{id: 'sad', value: 'asdas'}];

  constructor() { }

  ngOnInit() {
  }

}
