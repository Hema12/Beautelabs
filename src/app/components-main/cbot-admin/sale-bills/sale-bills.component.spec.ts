import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleBillsComponent } from './sale-bills.component';

describe('SaleBillsComponent', () => {
  let component: SaleBillsComponent;
  let fixture: ComponentFixture<SaleBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
