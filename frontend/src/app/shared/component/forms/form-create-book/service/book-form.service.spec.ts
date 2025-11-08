import { TestBed } from '@angular/core/testing';

import { BookFormService } from './book-form.service';

describe('BookFormService', () => {
  let service: BookFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
