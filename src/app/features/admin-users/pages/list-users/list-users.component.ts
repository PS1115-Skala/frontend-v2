import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { TIPO_USUARIO } from 'app/core/constants/userType';
import { Subject } from 'rxjs-compat';
import { AdminUsersService } from '../../services/admin-users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  tiposUsuarios: any[];
  isLoading: boolean;
  isTableReady: boolean;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective;
  dataSource: any[];

  constructor(
    //private coreService: CoreService,
    private usersService: AdminUsersService,
    //private loadingBar: LoadingBarService,
    //private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isTableReady = true;
    this.initTableOption();
    this.cargarUsuarios(undefined);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    //this.dialog.closeAll();
  }

  ngAfterViewInit() {
    this.isTableReady = true;
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.ngOnInit();
    });
  }

  cargarUsuarios(tipoUsuario?: string) {
    this.isLoading = true;
    tipoUsuario = tipoUsuario != 'todos' ? tipoUsuario : undefined;
    this.usersService.getUsers(tipoUsuario)
    .finally( () => {
      this.isLoading = false;
      this.isTableReady = true;
      this.dtTrigger.next();
    })
    .subscribe( response => {
      this.dataSource = response;
    });
  }

  mapTipo(tipo: string): string {
    return TIPO_USUARIO[+tipo];
  }

  crearModificarUsuario(idUsuario?: string) {
    this.router.navigate(['admin-users/user/', idUsuario ? idUsuario : 'crear']);
  }

}
