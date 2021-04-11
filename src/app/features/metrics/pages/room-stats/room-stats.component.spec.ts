import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomStatsComponent } from './room-stats.component';

describe('RoomStatsComponent', () => {
  let component: RoomStatsComponent;
  let fixture: ComponentFixture<RoomStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
