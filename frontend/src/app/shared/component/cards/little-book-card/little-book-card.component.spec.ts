import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LittleBookCard} from './little-book-card.component';

describe('LittleBookCard', () => {
  let component: LittleBookCard;
  let fixture: ComponentFixture<LittleBookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LittleBookCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LittleBookCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
