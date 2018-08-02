# ngx libraries

## About

An angular 6.0+ wrapper for flatpickr, timepicker

## Installation

Install through npm:

```
npm install --save moment
npm install --save flatpickr @harryy/ngx-flatpickr
npm install --save timepicker jquery @harryy/ngx-timepicker
```

Then include in your apps module:

```typescript
import 'flatpickr/dist/flatpickr.min.css'; // you may need to adjust the css import depending on your build tool
import 'timepicker/jquery.timepicker.min.css'; // you may need to adjust the css import depending on your build tool
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFlatpickrModule } from 'ngx-flatpickr';
import { NgxTimepickerModule } from 'ngx-timepicker';

@NgModule({
  imports: [FormsModule, NgxFlatpickrModule.forRoot(), NgxTimepickerModule.forRoot()]
})
export class MyModule {}
```

Finally use in one of your apps components:

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <input 
      type="text" 
      ngxFlatpickr 
      [(ngModel)]="selectedDate" 
      dateFormat="MMM DD, YYYY">
    <input 
      type="text" 
      ngxTimepicker 
      [(ngModel)]="selectedDate" 
      timeFormat="hh:mm a">
  `
})
export class MyComponent {}
```
