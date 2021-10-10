import { TestBed } from '@angular/core/testing';

import { LoansLogicService } from './loans-logic.service';

describe('LoansLogicService', () => {
  let service: LoansLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoansLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
