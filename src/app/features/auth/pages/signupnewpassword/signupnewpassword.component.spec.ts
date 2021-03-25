import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupnewpasswordComponent } from './signupnewpassword.component';

describe('SignupnewpasswordComponent', () => {
  let component: SignupnewpasswordComponent;
  let fixture: ComponentFixture<SignupnewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupnewpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupnewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
