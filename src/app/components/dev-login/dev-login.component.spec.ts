import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevLoginComponent } from './dev-login.component';

describe('DevLoginComponent', () => {
  let component: DevLoginComponent;
  let fixture: ComponentFixture<DevLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
