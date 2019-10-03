import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBookCreateComponent } from './day-book-create.component';

describe('DayBookCreateComponent', () => {
  let component: DayBookCreateComponent;
  let fixture: ComponentFixture<DayBookCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayBookCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayBookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
