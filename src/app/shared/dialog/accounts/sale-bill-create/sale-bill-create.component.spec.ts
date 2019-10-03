import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleBillCreateComponent } from './sale-bill-create.component';

describe('SaleBillCreateComponent', () => {
  let component: SaleBillCreateComponent;
  let fixture: ComponentFixture<SaleBillCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleBillCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleBillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
