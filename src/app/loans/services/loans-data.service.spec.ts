import { TestBed } from '@angular/core/testing';

import { LoansDataService } from './loans-data.service';

describe('LoansDataService', () => {
  let service: LoansDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoansDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
