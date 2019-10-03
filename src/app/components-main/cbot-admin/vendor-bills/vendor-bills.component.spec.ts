import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillsComponent } from './vendor-bills.component';

describe('VendorBillsComponent', () => {
  let component: VendorBillsComponent;
  let fixture: ComponentFixture<VendorBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
