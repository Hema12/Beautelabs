import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCashRegisterComponent } from './bank-cash-register.component';

describe('BankCashRegisterComponent', () => {
  let component: BankCashRegisterComponent;
  let fixture: ComponentFixture<BankCashRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankCashRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankCashRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
