import { TestBed } from '@angular/core/testing';

import { EsquemaService } from './esquema.service';

describe('EsquemaService', () => {
  let service: EsquemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsquemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
