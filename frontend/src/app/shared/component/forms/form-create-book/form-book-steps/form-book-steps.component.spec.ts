import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormBookSteps} from './form-book-steps.component';

describe('FormBookSteps', () => {
  let component: FormBookSteps;
  let fixture: ComponentFixture<FormBookSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBookSteps]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormBookSteps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
