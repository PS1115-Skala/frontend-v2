import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAsignationComponent } from './delete-asignation.component';

describe('DeleteAsignationComponent', () => {
  let component: DeleteAsignationComponent;
  let fixture: ComponentFixture<DeleteAsignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAsignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAsignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
