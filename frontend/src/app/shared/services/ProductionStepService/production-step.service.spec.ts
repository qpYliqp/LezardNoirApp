import { TestBed } from '@angular/core/testing';

import { ProductionStepService } from './production-step.service';

describe('ProductionStepService', () => {
  let service: ProductionStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
