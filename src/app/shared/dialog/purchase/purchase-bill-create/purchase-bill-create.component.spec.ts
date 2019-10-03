import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBillCreateComponent } from './purchase-bill-create.component';

describe('PurchaseBillCreateComponent', () => {
  let component: PurchaseBillCreateComponent;
  let fixture: ComponentFixture<PurchaseBillCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseBillCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
