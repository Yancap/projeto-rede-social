import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDataMessageComponent } from './label-data-message.component';

describe('LabelDataMessageComponent', () => {
  let component: LabelDataMessageComponent;
  let fixture: ComponentFixture<LabelDataMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelDataMessageComponent]
    });
    fixture = TestBed.createComponent(LabelDataMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
