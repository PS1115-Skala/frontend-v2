import { Component, OnInit } from '@angular/core';
import { AdminlabfService } from "../../services/adminlabf.service";
import { CoreService } from "app/core/services/core.service";
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RoomRequest } from "../../models/roomrequest";
import { MatDialog } from "@angular/material/dialog";
import { RejectionModal } from '../../modals/rejected/rejection-modal.component';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  trimester: string = "";
  trimesterID: string = "";
  trimesterForm: FormGroup;

  roomRequest: RoomRequest[];

  constructor(
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private adminlabfService :AdminlabfService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.definirFormulario();
    this.trimester = localStorage.getItem("term");
    this.getTrimester();
    this.getRoomRequests();
  }

  dateValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      
      const value = control.value;
      
      if (!value) {
        return null;
      }
      
      let dateValid = false;
      let start = new Date(this.trimesterForm.controls.startDate.value).toISOString();
      let finish = new Date(this.trimesterForm.controls.finishDate.value).toISOString();

      if(start < finish) {
        dateValid = true;
      }

      return !dateValid ? { dateInValid:true }: null;
    }
  }

  definirFormulario() {
    this.trimesterForm = this.formBuilder.group({
      startDate: [null, this.dateValidator()],
      finishDate: [null, this.dateValidator()]
    });
  }

  getTrimester() {
    this.coreService.getTrimester().subscribe((term) => {
      this.trimesterID = term[0].id;
      this.trimesterForm.patchValue({startDate: term[0].start, finishDate: term[0].finish});
    });
  }

  getRoomRequests() {
    this.adminlabfService.getRoomRequests().subscribe(requests => {
      this.roomRequest = requests;
    });
  }

  onSubmit(trimesterData) {
    const dates = {
      start: new Date(trimesterData.startDate).toISOString(),
      finish: new Date(trimesterData.finishDate).toISOString()
    };
    this.adminlabfService.putTrimester(this.trimesterID, dates).subscribe((response) => {
      this.successNotify(response.message);
    },
    (error) => {
      this.errorNotify('Hubo un error al procesar esta acción');
    });
  }

  acceptRequest(id){
    this.adminlabfService.putRoomRequests(id, 'A').subscribe((response) => {
      this.successNotify(response.message);
      this.getRoomRequests();
    },
    (error) => {
      this.errorNotify('Hubo un error al procesar esta acción');
    });
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

  viewRejectConfirmation(id: string){
    let dialogRef = this.dialog.open(RejectionModal, {
      width: "400px",
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getRoomRequests();
      }
    });
  }
}