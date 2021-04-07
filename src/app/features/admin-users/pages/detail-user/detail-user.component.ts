import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TIPO_USUARIO } from 'app/core/constants/userType';
import { AdminUsersService } from '../../services/admin-users.service';
declare var $: any;

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  /** Id del usuario undefined cuando se esta creando */
  public id: string;
  public form: FormGroup;
  public tiposUsuarios: any[];
  public estatus: any[];
  public options: any[];
  public camposModificados: string[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private usersService: AdminUsersService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id'] == 'crear' ? undefined : params['id']; });
    this.definirFormulario();
    this.cargaTiposUsuarios();
    this.cargaEstatus();
    this.cargarOptions();
    if (this.id) { this.cargarUsuario(); }
  }

  definirFormulario() {
    this.form = this.formBuilder.group({ 
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.pattern('([a-z,0-9,-]+@usb\.ve)')]],
      type: [null, [Validators.required]], 
      verificado: [null],
      activo: [null],
      chief: [null]
    });
  }

  /** Cargar estatus de momento estaticos */
  cargaEstatus() { this.estatus = [ {id: 1, name: 'Activo'}, {id: 0, name: 'Inactivo'}, ]; }

  /** Cargar Tipo Usuario constante global */
  cargaTiposUsuarios() { this.tiposUsuarios = Object.entries(TIPO_USUARIO); }

  cargarOptions() {
    this.options = [ {id: true, name: 'Si'}, {id: false, name: 'No'} ];
  }

  /** Cargar Informacion de usuario */
  cargarUsuario() {
    this.camposModificados = ['id'];
    this.usersService.getUser(this.id).subscribe( response => { 
      const campos = ['id', 'name', 'email', 'type', 'chief'];
      campos.forEach( campo => { this.form.controls[campo].setValue(response[0][campo]); });
      this.form.controls['verificado'].setValue(response[0].is_verified);
      this.form.controls['activo'].setValue(response[0].is_active);
      this.form.controls['id'].disable();
      this.form.controls['email'].disable();
    });
  }

  onFormChange(campo: string) {
    if (this.id != undefined) { this.camposModificados.push(campo); }
  }

  guardar(values) {
    if (this.id == undefined) { // crear
      const usuario = {usbId: values.id, userName: values.name, userEmail: values.email, userType: values.type};
      this.usersService.createUser(usuario)
      .subscribe( response => {
        this.successNotification(response.message);
        this.regresar();
      }, error => { 
        this.errorNotification(error.error.error);
      });
    }
    else { // actualizar
      let updValues = {...values};
      const filtrados = Object.entries(updValues);
      filtrados.forEach( v => { 
        if (this.camposModificados.includes(v[0]) == false) { updValues[v[0]] = undefined;}
      })
      updValues['is_active'] = updValues.activo;
      updValues.activo = undefined;
      updValues['is_verified'] = updValues.verificado;
      updValues.verificado = undefined;
      this.usersService.updateUser(this.id, updValues)
      .subscribe( response => {
        this.successNotification(response.message);
      }, error => { 
        this.errorNotification(error.error.error);
      });
    }
  }

  regresar() { this.location.back(); }

  successNotification(message: string) {
    $.notify(
      { icon: "check", message: message,},
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

  errorNotification(message: string) {
    $.notify(
      { icon: "error_outline", message: message },
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
