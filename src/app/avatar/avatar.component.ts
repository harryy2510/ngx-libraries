import { Component, OnInit } from '@angular/core';
import {AvatarConfig} from '../../../projects/ngx-avatar/src/lib/ngx-avatar.service';
import * as faker from "faker";

@Component({
  selector: 'lib-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  avatars = [];

  constructor() { }

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
  }

}
