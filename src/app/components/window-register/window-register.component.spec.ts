import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowRegisterComponent } from './window-register.component';

describe('WindowRegisterComponent', () => {
  let component: WindowRegisterComponent;
  let fixture: ComponentFixture<WindowRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindowRegisterComponent]
    });
    fixture = TestBed.createComponent(WindowRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
