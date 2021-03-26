import { Component, OnInit } from "@angular/core";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { USER_TYPE } from "app/core/constants/userType";
import { CoreService } from "app/core/services/core.service";
import { Subject } from "rxjs";
import { RequestsResponse } from "../../models/requests-response";
import { RequestsResponseAdmin } from "../../models/requests-response-admin";
import { RequestsService } from "../../services/requests.service";

@Component({
  selector: "app-requests-page",
  templateUrl: "./requests-page.component.html",
  styleUrls: ["./requests-page.component.css"],
})
export class RequestsPageComponent implements OnInit {
  private isAdmin: boolean;
  private requests: RequestsResponse[];
  private requestsAdmin: RequestsResponseAdmin[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading: boolean;

  constructor(
    private coreService: CoreService,
    private requestsService: RequestsService,
    private loadingBar: LoadingBarService
  ) {}

  initTableOption() {
    this.dtOptions = {
      order: [[2, "desc"]],
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
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  acceptRequest(element) {
    // Falta implementar
    alert("Falta implementar");
  }

  openRejectionDialog(element) {
    // Falta implementar
    alert("Falta implementar");
  }

  deletedRequest(elementId) {
    // Falta implementar
    alert("Falta implementar");
  }
}
