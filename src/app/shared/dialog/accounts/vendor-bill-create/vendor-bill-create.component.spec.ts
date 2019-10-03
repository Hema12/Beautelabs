import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillCreateComponent } from './vendor-bill-create.component';

describe('VendorBillCreateComponent', () => {
  let component: VendorBillCreateComponent;
  let fixture: ComponentFixture<VendorBillCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
