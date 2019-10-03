import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLocationComponent } from './inventory-location.component';

describe('InventoryLocationComponent', () => {
  let component: InventoryLocationComponent;
  let fixture: ComponentFixture<InventoryLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
