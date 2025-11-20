import { TestBed } from '@angular/core/testing';

import { BookViewService } from './book-view.service';

describe('BookViewService', () => {
  let service: BookViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
