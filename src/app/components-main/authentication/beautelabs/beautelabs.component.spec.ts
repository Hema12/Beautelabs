import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautelabsComponent } from './beautelabs.component';

describe('BeautelabsComponent', () => {
  let component: BeautelabsComponent;
  let fixture: ComponentFixture<BeautelabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautelabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautelabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
