import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialRequestsListComponent } from './special-requests-list.component';

describe('SpecialRequestsListComponent', () => {
  let component: SpecialRequestsListComponent;
  let fixture: ComponentFixture<SpecialRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialRequestsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
