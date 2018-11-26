import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

  asdasds = 'dsfdsfsdfdsfsddsf';

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.asdasds = 'sdfdsfsdf';
    }, 300);
  }

}
