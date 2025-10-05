import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookView } from './book-view';

describe('BookView', () => {
  let component: BookView;
  let fixture: ComponentFixture<BookView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
