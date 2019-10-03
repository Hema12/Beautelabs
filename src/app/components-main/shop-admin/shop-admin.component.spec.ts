import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAdminComponent } from './shop-admin.component';

describe('ShopAdminComponent', () => {
  let component: ShopAdminComponent;
  let fixture: ComponentFixture<ShopAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
