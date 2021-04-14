import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialRequestsFormComponent } from './special-requests-form.component';

describe('SpecialRequestsFormComponent', () => {
  let component: SpecialRequestsFormComponent;
  let fixture: ComponentFixture<SpecialRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialRequestsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
