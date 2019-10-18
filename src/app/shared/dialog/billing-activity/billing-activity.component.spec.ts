import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingActivityComponent } from './billing-activity.component';

describe('BillingActivityComponent', () => {
  let component: BillingActivityComponent;
  let fixture: ComponentFixture<BillingActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
