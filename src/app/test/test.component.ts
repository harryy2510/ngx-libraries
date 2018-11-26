import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  asdasds = 'dsfdsfsdfdsfssssddsf';

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.asdasds = 'ss';
    }, 300);
  }


}
