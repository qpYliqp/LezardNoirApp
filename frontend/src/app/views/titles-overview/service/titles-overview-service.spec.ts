import { TestBed } from '@angular/core/testing';

import { TitlesOverviewService } from './titles-overview-service';

describe('TitlesOverviewService', () => {
  let service: TitlesOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitlesOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
