import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoVoucherComponent } from './promo-voucher.component';

describe('PromoVoucherComponent', () => {
  let component: PromoVoucherComponent;
  let fixture: ComponentFixture<PromoVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
