import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateBook } from './form-create-book';

describe('FormCreateBook', () => {
  let component: FormCreateBook;
  let fixture: ComponentFixture<FormCreateBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
