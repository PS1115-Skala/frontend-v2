import { Component, OnInit } from '@angular/core';
import { AdminRoomsService } from "../../services/admin-rooms.service";
import { CoreService } from "app/core/services/core.service";
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userId: string;
  roomRequest: any[];
  newRoomForm: FormGroup;

  constructor(
    private coreService: CoreService,
    private adminroomsService :AdminRoomsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.newRoomForm = this.formBuilder.group({
      room_id: ['', this.formatValidator()]
    });
    this.userId = this.coreService.getuserId();
    this.getRoomRequests();
  }

  formatValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      
      const value = control.value;
      
      if (!value) {
        return null;
      }

      let stringValid = false;
      let regexp = '^([A-Z]{3})-([0-9]{3})$';
      if(value.match(regexp)) {
        stringValid = true;
      }
      console.log(stringValid)

      return !stringValid ? { stringValid:true }: null;
    }
  }

  getRoomRequests() {
    this.adminroomsService.getRoomRequests(this.userId).subscribe(requests => {
      this.roomRequest = requests;
    });
  }

  onSubmit() {
    const room_id = this.newRoomForm.controls.room_id.value;
    this.adminroomsService.postRoomRequest(this.userId,room_id).subscribe(response =>{
      this.getRoomRequests();
      this.successNotify(response.message);
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

}
