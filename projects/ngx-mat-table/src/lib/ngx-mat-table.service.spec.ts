import { TestBed } from '@angular/core/testing';

import { NgxMatTableService } from './ngx-mat-table.service';

describe('NgxMatTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMatTableService = TestBed.get(NgxMatTableService);
    expect(service).toBeTruthy();
  });
});
