import { TestBed } from '@angular/core/testing';

import { FieldConfigService } from './field-config.service';

describe('FieldConfigService', () => {
  let service: FieldConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
