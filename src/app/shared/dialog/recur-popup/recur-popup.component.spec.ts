import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurPopupComponent } from './recur-popup.component';

describe('RecurPopupComponent', () => {
  let component: RecurPopupComponent;
  let fixture: ComponentFixture<RecurPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
