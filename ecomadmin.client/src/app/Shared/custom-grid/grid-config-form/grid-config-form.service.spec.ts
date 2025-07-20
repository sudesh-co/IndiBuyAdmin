import { TestBed } from '@angular/core/testing';

import { GridConfigFormService } from './grid-config-form.service';

describe('GridConfigFormService', () => {
  let service: GridConfigFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridConfigFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
