import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLaboratoriesPageComponent } from './list-laboratories-page.component';

describe('ListLaboratoriesPageComponent', () => {
  let component: ListLaboratoriesPageComponent;
  let fixture: ComponentFixture<ListLaboratoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLaboratoriesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLaboratoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
