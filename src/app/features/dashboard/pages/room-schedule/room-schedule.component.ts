import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Room } from '../../models/room';
import { ScheduleTable } from '../../models/schedule';

@Component({
  selector: 'app-room-schedule',
  templateUrl: './room-schedule.component.html',
  styleUrls: ['./room-schedule.component.css']
})
export class RoomScheduleComponent implements OnInit{
  roomId: string;
  room: Room;
  isSpecific: boolean = false;
  numbers: Array<Number>;
  week: Number;
  displayedColumns: string[] = ['hour', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  public dataSource: ScheduleTable[];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {
    this.numbers = Array(12).fill(1).map((x,i)=>i+1);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params["roomId"];
    });
    this.dashboardService.getRoomDetails(this.roomId).subscribe((room) => {
      this.room = room[0];
    });
    this.createTable("todas");
  }

  createTable(typeWeek){
    this.dashboardService.getReservations(this.roomId, typeWeek).subscribe((asignation) => {
      this.dataSource = this.mapSchedule(asignation);
    });
  }

  othersWeek(typeWeek){
    this.isSpecific = false;
    this.createTable(typeWeek);
  }

  specificWeek(week){
    this.isSpecific = true;
    this.week = week;
    this.createTable(week.toString());
  }

  mapSchedule(schedule) {
    let mapSchedule: ScheduleTable[] = this.generateEmptySchedule();
    schedule.forEach( (block) => {
        mapSchedule[block.hour-1][block.day] = block.subject_id;
    });
    return mapSchedule;
  }

  generateEmptySchedule(){
    let emptySchedule: ScheduleTable[] = [];
    for (let i = 1; i <= 12; i++){
        let rowSched = { 
            hour: i, 
            lunes: null, 
            martes: null, 
            miercoles: null, 
            jueves: null, 
            viernes: null 
        }
        emptySchedule.push(rowSched);
    }
    return emptySchedule;
  }
}
