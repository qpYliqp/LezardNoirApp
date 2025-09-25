import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBookDetails } from './form-book-details';

describe('FormBookDetails', () => {
  let component: FormBookDetails;
  let fixture: ComponentFixture<FormBookDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBookDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBookDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
