import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChipSelectComponent } from './ngx-chip-select.component';

describe('NgxChipSelectComponent', () => {
  let component: NgxChipSelectComponent;
  let fixture: ComponentFixture<NgxChipSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxChipSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
