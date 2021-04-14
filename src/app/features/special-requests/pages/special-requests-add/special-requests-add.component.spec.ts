import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialRequestsAddComponent } from './special-requests-add.component';

describe('SpecialRequestsAddComponent', () => {
  let component: SpecialRequestsAddComponent;
  let fixture: ComponentFixture<SpecialRequestsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialRequestsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialRequestsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
