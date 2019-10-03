import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSaleComponent } from './quick-sale.component';

describe('QuickSaleComponent', () => {
  let component: QuickSaleComponent;
  let fixture: ComponentFixture<QuickSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
