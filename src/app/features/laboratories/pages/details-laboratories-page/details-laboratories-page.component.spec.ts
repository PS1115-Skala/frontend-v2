import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLaboratoriesPageComponent } from './details-laboratories-page.component';

describe('DetailsLaboratoriesPageComponent', () => {
  let component: DetailsLaboratoriesPageComponent;
  let fixture: ComponentFixture<DetailsLaboratoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsLaboratoriesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLaboratoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
