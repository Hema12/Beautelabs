import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTransferComponent } from './store-transfer.component';

describe('StoreTransferComponent', () => {
  let component: StoreTransferComponent;
  let fixture: ComponentFixture<StoreTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
