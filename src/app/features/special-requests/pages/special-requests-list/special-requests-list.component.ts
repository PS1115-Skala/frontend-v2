import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { USER_TYPE } from 'app/core/constants/userType';

import { CoreService } from 'app/core/services/core.service';
import { DeleteAsignationModalComponent } from '../../modals/delete-asignation-modal.component';
import { SpecialRequestsFormModalComponent } from '../../modals/special-requests-form-modal.component';
import { SpecialRequestsService } from '../../services/special-requests.service';

@Component({
  selector: 'app-special-requests-list',
  templateUrl: './special-requests-list.component.html',
  styleUrls: ['./special-requests-list.component.css']
})
export class SpecialRequestsListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  isTableReady: boolean;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective;
  isLoading: boolean;
  isLabF: boolean;
  reservasEspeciales: any[];
  form: FormGroup;
  laboratorios: any[];
  trimestres: any[];
  dataSource: any[];
  dialogRef: any;
  mySubscription;

  constructor(
    private specialRequestsService: SpecialRequestsService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.isLoading = false;
    this.isTableReady = true;
    this.isLabF = this.coreService.getuserType() == USER_TYPE.LAB_F;
    this.initTableOption();
    this.defineFilterForm();
    this.loadTrimestres();
    this.loadReservasEspeciales(!this.isLabF ? this.coreService.getuserId() : null);
    this.coreService.getAdminLabs().subscribe( response => this.laboratorios = response );
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    if (this.dialogRef) { this.dialogRef.close() }
    if (this.mySubscription) { this.mySubscription.unsubscribe(); }
  }

  ngAfterViewInit() {
    this.isTableReady = true;
  }

  defineFilterForm() {
    const laboratorio = this.isLabF ? 'todos' : this.coreService.getuserId();
    this.form = this.formBuilder.group({ trimestre: ['todos'], });
  }
  
  loadTrimestres() {
    this.coreService.getTrimesters().subscribe( response => this.trimestres = response );
  }
  
  /** Cargar reservas especiales filtros laboratorio, trimestre opcionales */
  loadReservasEspeciales(laboratorio?: string, trimestre?: string) {
    this.isLoading = true;
    this.specialRequestsService.getSpecialReservations(laboratorio, trimestre)
    .pipe(finalize( () => {this.dtTrigger.next()} ))
    .subscribe( response => {
      this.dataSource = response;
      this.isLoading = false;
      this.isTableReady = true;
      // // ordenar por fecha
      // this.dataSource.data = this.dataSource.data.sort( (a: any, b: any) => {
      //   if (a.reservation_day > b.reservation_day) { return -1 }
      //   else if (a.reservation_day < b.reservation_day) { return 1}
      //   else { return 0 }
      // });
    });
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

  reLoad(){
    this.router.navigate([this.router.url])
  }

  /** Filtra reservas especiales de tabla */
  onFormChange(event: any) {
    const laboratorio = !this.isLabF ? this.coreService.getuserId() : null
    const trimestre = this.form.value.trimestre == 'todos' ? null : this.form.value.trimestre;
    this.loadReservasEspeciales(laboratorio, trimestre);
    this.reLoad();
  }

  /** Abrir dialogo de form reservas especiales */
  onCreateReserv() {
    this.dialogRef = this.dialog.open(SpecialRequestsFormModalComponent, { 
      width: '575px',
      data: {title: 'Crear Reserva Especial', laboratorios: this.laboratorios}
    });

    this.dialogRef.afterClosed().subscribe( result => { 
      if (result != -1 && result != undefined) { this.nuevaReserva(result); } 
    });
  }

  /** Abrir dialogo de form de reservas especiales con data cargada */
  detailReserva(idReserva: number) {
    this.specialRequestsService.getSpecialReservations(null, null, idReserva).subscribe( response => {
      this.dialogRef = this.dialog.open(SpecialRequestsFormModalComponent, { 
        width: '575px',
        data: {title: 'Detalle Reserva Especial', laboratorios: this.laboratorios, datos: response}
      });
  
      this.dialogRef.afterClosed().subscribe( result => { 
        if (result != -1 && result != undefined) { console.warn('no debe pasar'); } 
      });
    });
  }

  /** Abrir dialogo para confirmar eliminar reserva especial, si se confirma se elimina */
  deleteReserva(idReserva: any) {
    this.dialogRef = this.dialog.open(DeleteAsignationModalComponent, {
      data: {title: 'Atención', message: 'Esta seguro que desea eliminar la reserva ' + idReserva}
    });

    this.dialogRef.afterClosed().subscribe( result => {
      if (result == 'Si') {
        this.specialRequestsService.deleteSpecialReservation(idReserva)
        .subscribe(
          response => {
            this.coreService.successNotification(response.message);
            this.onFormChange({});
          },
          error => { this.coreService.errorNotification(error.error.error); }
        );
      }
    })
  }

  /** Función que se llama desde onCreateReserv() cuando se va a crear la reserva especial */
  nuevaReserva(values: any) {
    const userId = this.coreService.getuserId();
    this.specialRequestsService.createSpecialReservation(values, userId)
    .subscribe( 
      response => { 
        this.coreService.successNotification(response.message); 
        this.onFormChange({}); 
      },
      error => { this.coreService.errorNotification(error.error.error); } 
    );
  }

}
