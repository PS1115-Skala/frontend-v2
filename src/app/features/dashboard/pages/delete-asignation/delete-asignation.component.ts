import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDeleteConfirm } from '../../components/delete-asignation/dialog-delete-confirm.component';
import { DialogSpecificWeek } from '../../components/delete-asignation/dialog-specific-week.component';
import { Room } from '../../models/room';
import { ScheduleTable } from '../../models/schedule';
import { SelectData } from '../../models/selectData';
import { Subjects } from '../../models/subjects';
import { DashboardService } from '../../services/dashboard.service';
declare var $: any;

@Component({
  selector: 'app-delete-asignation',
  templateUrl: './delete-asignation.component.html',
  styleUrls: ['./delete-asignation.component.css']
})
export class DeleteAsignationComponent implements OnInit, OnDestroy {
  roomId: string;
  room: Room;
  subjects: Subjects[];
  weeks: string;
  isTableReady: boolean;
  isSpecificWeek: boolean = false;
  typeWeek: string;
  public displayedColumns: string[] = ['hour', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  public dataSource: ScheduleTable[];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params["roomId"];
    });
    this.dashboardService.getRoomDetails(this.roomId).subscribe((room) => {
      this.room = room[0];
    });
    this.dashboardService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  selectWeeks() {
    this.isTableReady = false;
    (this.weeks == 'especifica') ? this.specificWeek() : this.otherWeek();
  }

  specificWeek(){
    this.isSpecificWeek = true;
    const selectData: SelectData = {
      specificWeek: ''
    };
    const dialogRef = this.dialog.open(DialogSpecificWeek, {
      data: selectData
    });
    dialogRef.afterClosed().subscribe( (result) => {
      if (result) {
        this.typeWeek = selectData.specificWeek;
        this.createTable();
      }
    })
  }

  otherWeek(){
    this.isSpecificWeek = false;
    this.typeWeek = this.weeks;
    this.createTable();
  }

  createTable(){
    this.dashboardService.getReservationsSchedule(this.roomId, this.typeWeek).subscribe( (data) => {
      this.dataSource = this.mapSchedule(data);
      this.isTableReady = true;
    })
  }

  ngOnDestroy(){
    this.dialog.closeAll();
  }

  canDelete(): boolean {
    const index = this.dataSource.findIndex(d => (
      d.lunesCheck == true || d.martesCheck == true || 
      d.miercolesCheck == true || d.juevesCheck == true || 
      d.viernesCheck == true)
    );
    return (index != -1); 
  }

  deleteReservation(){
    const scheduleDelete = [];
    this.dataSource.forEach( (sch) => {
      for (let index in sch){
        if (this.checkIndex(index) && sch[index]){
          let obj = {
            subject: sch[index.substring(0, index.length - 5)],
            dia: index.substring(0, index.length - 5),
            hora: sch.hour
          };
          scheduleDelete.push(obj);
        }
      }
    })
    const dialogFieldRef = this.dialog.open(DialogDeleteConfirm);
    dialogFieldRef.afterClosed().subscribe( result => {
      if (result) { 
        this.dashboardService.createRequestToDelete(this.roomId, this.typeWeek, scheduleDelete).subscribe( (response) => {
          this.successNotify(response.message);
          this.router.navigate(["/dashboard/rooms-details", this.roomId]);
        }, 
        (error) => {
          this.errorNotify(error);
        })
      }
    });
  }

  goBack(){
    this.router.navigate(["/dashboard/rooms-details", this.roomId]);
  }

  checkIndex = (index) => index == 'lunesCheck' || index == 'martesCheck' || index == 'miercolesCheck' ||
                          index == 'juevesCheck' || index == 'viernesCheck';

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

  successNotify(message) {
    $.notify(
      {
        icon: "check",
        message: message,
      },
      {
        type: "success",
        timer: 5000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }

  errorNotify(message) {
    $.notify(
      {
        icon: "close",
        message: message,
      },
      {
        type: "danger",
        timer: 5000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }
}
