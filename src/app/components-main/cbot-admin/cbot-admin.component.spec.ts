import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbotAdminComponent } from './cbot-admin.component';

describe('CbotAdminComponent', () => {
  let component: CbotAdminComponent;
  let fixture: ComponentFixture<CbotAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbotAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbotAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
