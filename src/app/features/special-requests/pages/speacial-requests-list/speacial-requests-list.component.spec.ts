import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeacialRequestsListComponent } from './speacial-requests-list.component';

describe('SpeacialRequestsListComponent', () => {
  let component: SpeacialRequestsListComponent;
  let fixture: ComponentFixture<SpeacialRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeacialRequestsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeacialRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
