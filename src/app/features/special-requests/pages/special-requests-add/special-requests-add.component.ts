import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs-compat";
import { finalize } from "rxjs/operators";

import { CoreService } from "app/core/services/core.service";
import { SpecialRequestsService } from "../../services/special-requests.service";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-special-requests-add",
  templateUrl: "./special-requests-add.component.html",
  styleUrls: ["./special-requests-add.component.css"],
})
export class SpecialRequestsAddComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  isTableReady: boolean;
  isLoading: boolean;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective;
  laboratorios: any[];
  dataSource: any[] = [];
  isFormActive: boolean;
  mySubscription;

  constructor(
    private specialRequestsService: SpecialRequestsService,
    private coreService: CoreService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.isTableReady = true;
    this.isLoading = false;
    this.isFormActive = true;
    this.coreService
      .getAdminLabs()
      .subscribe((response) => (this.laboratorios = response));
    this.initTableOption();
    this.consultaHistorico();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.isTableReady = true;
  }

  /** Inicializar opciones de tabla */
  initTableOption() {
    this.dtOptions = {
      order: [[1, "reservation_day"]],
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

  reLoad() {
    this.router.navigate([this.router.url]);
  }

  consultaHistorico() {
    this.isLoading = true;
    this.isTableReady = false;
    if (this.dataSource && this.dataSource.length > 0) {
      this.dataSource = [];
    }
    this.specialRequestsService
      .getUserSpecialReservations(this.coreService.getuserId())
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isTableReady = true;
          this.dtTrigger.next();
        })
      )
      .subscribe((response) => {
        this.dataSource = response;
      });
  }

  onCrear(values: any) {
    const userId = this.coreService.getuserId();
    this.specialRequestsService
      .createSpecialReservation(values, userId)
      .subscribe(
        (response) => {
          this.coreService.successNotification(response.message);
          this.isFormActive = false;
          this.reLoad();
        },
        (error) => {
          this.coreService.errorNotification(error.error.error);
        }
      );
  }
}
