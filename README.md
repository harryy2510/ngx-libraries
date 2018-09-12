# ngx libraries

## Installation

Install through npm:

```
npm install --save flatpickr moment @harryy/ngx-flatpickr
npm install --save jquery timepicker moment @harryy/ngx-timepicker
npm install --save multimatch @harryy/ngx-rights
npm install --save svg.js svg.filter.js @harryy/ngx-avatar
```

Then include in your apps module:

```typescript
import 'flatpickr/dist/flatpickr.min.css'; // you may need to adjust the css import depending on your build tool
import 'timepicker/jquery.timepicker.min.css'; // you may need to adjust the css import depending on your build tool
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFlatpickrModule } from 'ngx-flatpickr';
import { NgxTimepickerModule } from 'ngx-timepicker';
import { NgxRightsModule } from 'ngx-rights';
import { NgxAvatarModule } from 'ngx-avatar';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';

@NgModule({
  imports: [
    FormsModule,
    NgxFlatpickrModule.forRoot(),
    NgxTimepickerModule.forRoot(),
    NgxRightsModule.forRoot(),
    NgxAvatarModule.forRoot(),
    NgxTrumbowygModule.forRoot()
  ]
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
  <ngx-avatar [upload]="true" [name]="name" [image]="image"></ngx-avatar>

  `
})
export class MyComponent {}
```
