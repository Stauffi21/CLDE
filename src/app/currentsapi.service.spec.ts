import { TestBed } from '@angular/core/testing';

import { CurrentsApiService } from './currentsapi.service';

describe('CurrentsapiService', () => {
  let service: CurrentsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
