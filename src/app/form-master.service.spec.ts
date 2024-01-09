import { TestBed } from '@angular/core/testing';

import { FormMasterService } from './form-master.service';

describe('FormMasterService', () => {
  let service: FormMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
