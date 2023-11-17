import { TestBed } from '@angular/core/testing';

import { UiUtilService } from './ui-util.service';

describe('UiUtilService', () => {
  let service: UiUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
