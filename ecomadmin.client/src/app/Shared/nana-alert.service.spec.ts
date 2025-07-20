import { TestBed } from '@angular/core/testing';

import { NanaAlertService } from './nana-alert.service';

describe('NanaAlertService', () => {
  let service: NanaAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NanaAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
