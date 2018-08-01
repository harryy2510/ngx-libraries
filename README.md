# ngx flatpickr

## About

An angular 6.0+ wrapper for flatpickr

## Installation

Install through npm:

```
npm install --save @harryy/ngx-flatpickr
```

Then include in your apps module:

```typescript
import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFlatpickrModule } from 'ngx-flatpickr';

@NgModule({
  imports: [FormsModule, NgxFlatpickrModule.forRoot()]
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
      [altInput]="true">
  `
})
export class MyComponent {}
```
