import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlabfComponent } from './adminlabf.component';

describe('AdminlabfComponent', () => {
  let component: AdminlabfComponent;
  let fixture: ComponentFixture<AdminlabfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminlabfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlabfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
