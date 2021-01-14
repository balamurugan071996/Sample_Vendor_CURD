import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminvendorComponent } from './adminvendor.component';

describe('AdminvendorComponent', () => {
  let component: AdminvendorComponent;
  let fixture: ComponentFixture<AdminvendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminvendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
