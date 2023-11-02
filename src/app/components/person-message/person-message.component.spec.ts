import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMessageComponent } from './person-message.component';

describe('PersonMessageComponent', () => {
  let component: PersonMessageComponent;
  let fixture: ComponentFixture<PersonMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonMessageComponent]
    });
    fixture = TestBed.createComponent(PersonMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
