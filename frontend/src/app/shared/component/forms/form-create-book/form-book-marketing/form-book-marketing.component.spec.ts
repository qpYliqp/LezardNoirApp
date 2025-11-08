import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormBookMarketing} from './form-book-marketing.component';

describe('FormBookMarketing', () => {
  let component: FormBookMarketing;
  let fixture: ComponentFixture<FormBookMarketing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBookMarketing]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormBookMarketing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
