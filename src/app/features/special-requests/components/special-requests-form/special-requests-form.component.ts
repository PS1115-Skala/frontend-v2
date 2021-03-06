import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'app/core/services/core.service';

@Component({
  selector: 'app-special-requests-form',
  templateUrl: './special-requests-form.component.html',
  styleUrls: ['./special-requests-form.component.css']
})
export class SpecialRequestsFormComponent implements OnInit {
  public form: FormGroup;
  public componentDescription: string;
  public hours: any[];
  public minDate: Date;
  public maxDate: Date;
  @Input() datos: any;
  @Input() laboratorios: any[];
  @Output() formValues = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private coreService: CoreService) { }

  ngOnInit() {
    this.createForm();
    this.hours = [
      {id: '7:00AM'},{id: '8:00AM'},{id: '9:00AM'},{id: '10:00AM'},
      {id: '11:00AM'},{id: '12:00AM'},{id: '1:00PM'},{id: '2:00PM'},
      {id: '3:00PM'},{id: '4:00PM'},{id: '5:00PM'},{id: '6:00PM'},
    ];
    this.getEndTrimestre();
    this.componentDescription = 'Formulario para crear Reservas Especiales';
    if (this.datos != undefined) { this.cargarDatos(); }
  }

  createForm() {
    this.minDate = new Date();
    this.form = this.formBuilder.group({ 
      contact_name: [null, [Validators.required]], 
      contact_email: [null, [Validators.required, Validators.email]],
      laboratory: [null, [Validators.required]],
      reservation_day: [null, [Validators.required]],
      reservation_hour: [null, [Validators.required]],
      amount_people: [null, [Validators.required, Validators.pattern('([0-9]+)')]],
      observations: [null],
      requester_id: [null],
      trimester_id: [null]
    });
  }
  
  cargarDatos() {
    this.form.patchValue(this.datos);
    this.form.disable();
  }

  getEndTrimestre() {
    this.coreService.getTrimester().subscribe(response => this.maxDate = response[0].finish )
  }

  onFormChange(event?: any) {

  }

  create() {
    this.formValues.emit(this.form.value);
  }
}
