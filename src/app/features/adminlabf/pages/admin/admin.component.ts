import { Component, OnInit } from '@angular/core';
import { AdminlabfService } from "../../services/adminlabf.service";
import { CoreService } from "app/core/services/core.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomRequest } from "../../models/roomrequest";
import { MatDialog } from "@angular/material/dialog";
import { RejectionModal } from '../../modals/rejected/rejection-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  trimester: string = "";
  trimesterID: string = "";
  trimesterForm: FormGroup;
  // buttons controllers
  actionsDisabled = false;

  roomRequest: RoomRequest[];

  constructor(
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private adminlabfService :AdminlabfService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.trimester = localStorage.getItem("term");
    this.definirFormulario();
    this.getRoomRequests();
  }

  definirFormulario() {
    this.trimesterForm = this.formBuilder.group({
      startDate: [null],
      finishDate: [null]
    });
  }

  getTrimester() {
    this.coreService.getTrimester().subscribe((term) => {
      this.trimesterID = term[0].id;
      this.trimesterForm.patchValue({startDate: term[0].start});
      this.trimesterForm.patchValue({finishDate: term[0].finish});
    });
  }

  getRoomRequests() {
    this.adminlabfService.getRoomRequests().subscribe(requests => {
      this.roomRequest = requests;
    });
  }

  onSubmit(trimesterData) {
    this.actionsDisabled = true;
    const dates = {
      start: new Date(trimesterData.startDate).toISOString(),
      finish: new Date(trimesterData.finishDate).toISOString()
    };
    this.adminlabfService.putTrimester(this.trimesterID, dates)
  }

  viewRejectConfirmation(reason: string){
    this.dialog.open(RejectionModal, {
      width: "400px",
      data: {
        reason: reason
      }
    });
  }

}
