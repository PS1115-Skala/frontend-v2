import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { USER_TYPE } from "app/core/constants/userType";
import { CoreService } from "app/core/services/core.service";
import { Subject } from "rxjs";
import { RequestsResponse } from "../../models/requests-response";
import { RequestsResponseAdmin } from "../../models/requests-response-admin";
import { RejectionData } from '../../models/rejection-data';
import { RequestsService } from "../../services/requests.service";
import { MatDialog } from "@angular/material/dialog";
import { ScheduleModal } from "../../modals/schedule/schedule-modal.component";
import { ViewReasonModal } from '../../modals/rejected/view-reason.component';
import { RejectionModal } from '../../modals/rejected/rejection-modal.component';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;

@Component({
  selector: "app-requests-page",
  templateUrl: "./requests-page.component.html",
  styleUrls: ["./requests-page.component.css"],
})
export class RequestsPageComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isAdmin: boolean;
  requests: RequestsResponse[];
  requestsAdmin: RequestsResponseAdmin[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading: boolean;
  isTableReady: boolean = false;

  constructor(
    private coreService: CoreService,
    private requestsService: RequestsService,
    private loadingBar: LoadingBarService,
    private dialog: MatDialog,
  ) {}

  initTableOption() {
    this.dtOptions = {
      order: [[1, "desc"]],
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

  ngOnInit(): void {
    this.loadingBar.start();
    this.isLoading = true;
    let userType = this.coreService.getuserType();
    let userId = this.coreService.getuserId();
    this.isAdmin = userType == USER_TYPE.LAB_ADMIN;
    this.initTableOption();
    if (this.isAdmin) {
      this.requestsService.getRequestsAdminLab(userId).subscribe((requests) => {
        this.isLoading = false;
        this.loadingBar.stop();
        this.requestsAdmin = requests;
        this.dtTrigger.next();
      });
    } else {
      this.requestsService.getRequestsUser(userId).subscribe((requests) => {
        this.isLoading = false;
        this.loadingBar.stop();
        this.requests = requests;
        this.dtTrigger.next();
      });
    }
    this.isTableReady = true;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dialog.closeAll();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.ngOnInit();
    });
  }

  openScheduleDialog(requestId: string){
    this.dialog.open(ScheduleModal, {
      data: {
        requestId: requestId
      }
    });
  }

  acceptRequest(requestId: string) {
    this.requestsService.reservationRequestDecision(requestId, 'A').subscribe( (response) => {
      this.isTableReady = false;
      this.successNotify(response.message);
      this.rerender();
    },
    (error) => {
      this.errorNotify(error);
    });
  }

  viewRejectedReason(reason: string){
    this.dialog.open(ViewReasonModal, {
      width: "400px",
      data: {
        reason: reason
      }
    });
  }

  openRejectionDialog(requestId: string) {
    const rejectionData: RejectionData = {
      reason: '',
    };
    const dialogRef = this.dialog.open(RejectionModal, {
      width: "300px",
      data: rejectionData
    });
    dialogRef.afterClosed().subscribe( rejection => {
      if (rejection){ 
        this.requestsService.reservationRequestDecision(requestId, 'R', rejectionData.reason).subscribe( (response) => {
          this.isTableReady = false;
          this.successNotify(response.message);
          this.rerender();
        },
        (error) => {
          this.errorNotify(error);
        })
      }
    });
  }

  deletedRequest(requestId: string) {
    this.requestsService.deleteRequest(requestId).subscribe( response => {
      this.isTableReady = false;
      this.successNotify(response.message);
      this.rerender();
    },
    (error) => {
      this.errorNotify(error);
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