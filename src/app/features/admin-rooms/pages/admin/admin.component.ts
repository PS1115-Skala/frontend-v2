import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminRoomsService } from "../../services/admin-rooms.service";
import { CoreService } from "app/core/services/core.service";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { RoomRequest } from "../../../adminlabf/models/roomrequest";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
declare var $: any;

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  userId: string;
  roomRequest: RoomRequest[] = [];
  newRoomForm: FormGroup;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(
    private coreService: CoreService,
    private adminroomsService: AdminRoomsService,
    private formBuilder: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    this.initTableOption();
    this.newRoomForm = this.formBuilder.group({
      room_id: ["", this.formatValidator()],
    });
    this.userId = this.coreService.getuserId();
    this.getRoomRequests();
  }

  initTableOption() {
    this.dtOptions = {
      //order: [['1111', "type"]],
      pageLength: 10,
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

  formatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      let stringValid = false;
      let regexp = "^([A-Z]{3})-([0-9]{3})$";
      if (value.match(regexp)) {
        stringValid = true;
      }
      console.log(stringValid);

      return !stringValid ? { stringValid: true } : null;
    };
  }

  getRoomRequests() {
    this.adminroomsService
      .getRoomRequests(this.userId)
      .subscribe((requests) => {
        this.roomRequest = requests;
        this.rerender();
      });
  }

  onSubmit() {
    const room_id = this.newRoomForm.controls.room_id.value;
    this.adminroomsService.postRoomRequest(this.userId, room_id).subscribe(
      (response) => {
        this.getRoomRequests();
        this.successNotify(response.message);
      },
      (error) => {
        this.errorNotify("Hubo un error al procesar esta acción");
      }
    );
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
