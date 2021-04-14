import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RequestsService } from "../../services/requests.service";
import { Subject } from "rxjs";

@Component({
    selector: "schedule-modal",
    templateUrl: "./schedule-modal.component.html"
})
export class ScheduleModal implements OnInit {
    public availabilitySchedule = [];
    public title: string;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    constructor(
        private dialogRef: MatDialogRef<ScheduleModal>,
        private requestsService: RequestsService,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {}

    initTableOption() {
        this.dtOptions = {
          pageLength: 12,
          ordering: false,
          lengthChange: false,
          paging: false,
          searching: false,
          info: false,
          autoWidth: false,
          language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No hay registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ filas",
            infoEmpty: "No hay registros disponibles",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar",
            paginate: {
              first: "Primero",
              last: "Ultimo",
              next: "Siguiente",
              previous: "Anterior",
            },
          },
        };
      }

    ngOnInit() {
        this.requestsService.getScheduleRequest(this.data.requestId).subscribe( (data) => {
            if (!data) {
                this.initTableOption();
                this.dtTrigger.next();
                return
            };
            let { typeWeek, title } = getTypesWeek(data.typeWeek);
            this.title = title;
            let requestSchedule = this.mapSchedule(data.schedule);
            this.initTableOption();
            this.requestsService.getSchedule(data.schedule[0].room_id, typeWeek).subscribe((asignation) => {
                let mapSchedule = this.mapSchedule(asignation);
                this.availabilitySchedule = this.mergeSchedule(requestSchedule, mapSchedule);
                this.dtTrigger.next();
            })
        })
    }

    mergeSchedule(requestSchedule, roomSchedule){
        let availabilitySchedule = this.generateEmptySchedule();
        let days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
        for (let i = 0; i < 12; i++){
            days.forEach( (day) => {
                if (requestSchedule[i][day] && roomSchedule[i][day]) availabilitySchedule[i][day] = '2';
                else if (requestSchedule[i][day] && !roomSchedule[i][day]) availabilitySchedule[i][day] = '1';
                else if (!requestSchedule[i][day] && roomSchedule[i][day]) availabilitySchedule[i][day] = '0';
            })
        }
        return availabilitySchedule;
    }

    mapSchedule(schedule) {
        let mapSchedule = this.generateEmptySchedule();
        schedule.forEach( (block) => {
            mapSchedule[block.hour-1][block.day] = '0';
        });
        return mapSchedule;
    }

    close() {
      this.dialogRef.close();
      this.dtTrigger.unsubscribe();
    }
  
    ngOnDestroy(): void {
      this.close();
      this.dtTrigger.unsubscribe();
    }

    generateEmptySchedule(){
        let emptySchedule = [];
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

const getTypesWeek = (typeWeek) => {
    if (parseInt(typeWeek)) {
        return { typeWeek: typeWeek, title: `Semana Especifica: ${typeWeek}` }
    }
    return { typeWeek, title: `Semanas: ${typeWeek}` }
}