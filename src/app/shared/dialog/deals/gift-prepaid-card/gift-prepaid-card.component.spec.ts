import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftPrepaidCardComponent } from './gift-prepaid-card.component';

describe('GiftPrepaidCardComponent', () => {
  let component: GiftPrepaidCardComponent;
  let fixture: ComponentFixture<GiftPrepaidCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftPrepaidCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftPrepaidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
