import { TestBed } from '@angular/core/testing';

import { GettripsService } from './gettrips.service';

describe('GettripsService', () => {
  let service: GettripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
