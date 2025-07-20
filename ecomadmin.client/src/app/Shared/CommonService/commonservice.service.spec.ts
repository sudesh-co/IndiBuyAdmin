import { TestBed } from '@angular/core/testing';

import { CommonserviceService } from './common.service';

describe('CommonserviceService', () => {
  let service: CommonserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
