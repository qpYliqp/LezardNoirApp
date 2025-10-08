import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBookAuthors } from './form-book-authors';

describe('FormBookAuthors', () => {
  let component: FormBookAuthors;
  let fixture: ComponentFixture<FormBookAuthors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBookAuthors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBookAuthors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
