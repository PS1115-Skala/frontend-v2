import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { USER_TYPE } from "app/core/constants/userType";
import { CoreService } from "app/core/services/core.service";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { createReservation } from "../../models/createReservation";
import { Room } from "../../models/room";
import { Subjects } from "../../models/subjects";
import { DashboardService } from "../../services/dashboard.service";
declare var $: any;

@Component({
  selector: "app-room-reservation",
  templateUrl: "./room-reservation.component.html",
  styleUrls: ["./room-reservation.component.css"],
})
export class RoomReservationComponent implements OnInit {
  roomId: string;
  room: Room;
  picture: string;
  API = environment.api_url;
  reservationForm;
  subjectOptions: Subjects[];
  subjectStringOptions: string[];
  subjectHashOptions: Object;
  subjectFilteredOptions: Observable<Subjects[]>;
  weekDays = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  weekOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedDayHours: any[] = [];
  checkCounts: number = 0;
  checkCountsError: boolean = false;
  isHourTableReady: boolean = false;
  reservedDayHours: Object;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private loadingBar: LoadingBarService,
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private router: Router
  ) {}

  validSubjectString(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.subjectStringOptions) {
        return !this.subjectStringOptions.includes(control.value)
          ? { validSubject: { value: control.value } }
          : null;
      }
    };
  }

  validSelectSpecificWeek(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return !this.weekOptions.includes(control.value)
        ? { requiredSpecificWeek: { value: control.value } }
        : null;
    };
  }

  getRoomDetails() {
    this.route.params.subscribe((params) => {
      this.roomId = params["roomId"];
    });
    this.dashboardService.getRoomDetails(this.roomId).subscribe((room) => {
      this.room = room[0];
      this.picture = `${this.API}/salas/${this.roomId}/picture`;
    });
  }

  // Funcion para crear hash con los dias ocupados por alguna materia
  setTableHour(semana) {
    this.loadingBar.start();
    this.selectedDayHours = [];
    this.checkCounts = 0;
    this.dashboardService
      .getReservations(this.roomId, semana)
      .subscribe((dayHours) => {
        this.reservedDayHours = Object.create(null);
        dayHours.forEach((reservation) => {
          // Se crea el hash[dia-hora] = materia
          this.reservedDayHours[`${reservation.day}-${reservation.hour}`] =
            reservation.subject_id;
        });
        this.isHourTableReady = true;
        this.loadingBar.complete();
      });
  }

  isReservedDayHour(hour, day): boolean {
    return `${day}-${hour}` in this.reservedDayHours;
  }

  getSubject(hour, day) {
    return this.reservedDayHours[`${day}-${hour}`];
  }

  setSpecificWeekValidator() {
    this.semanas.valueChanges.subscribe((semana) => {
      if (semana == "especifica") {
        this.semanaEspecifica.setValidators([this.validSelectSpecificWeek()]);
        this.semanaEspecifica.updateValueAndValidity();
        this.isHourTableReady = false;
      } else {
        this.semanaEspecifica.setValidators(null);
        this.semanaEspecifica.updateValueAndValidity();
        this.setTableHour(semana);
      }
    });
  }

  listenSpecifWeekChanges() {
    this.semanaEspecifica.valueChanges.subscribe((semanaEspecifica) => {
      if (semanaEspecifica) {
        this.setTableHour(semanaEspecifica);
      }
    });
  }

  initReservationForm() {
    this.reservationForm = new FormGroup({
      materia: new FormControl("", [
        Validators.required,
        this.validSubjectString(),
      ]),
      cantidad: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
      ]),
      semanas: new FormControl("", Validators.required),
      requerimientosAdicionales: new FormControl(""),
      semanaEspecifica: new FormControl(""),
    });
  }

  getMateriasOptions() {
    this.dashboardService.getSubjects().subscribe((subjects) => {
      this.subjectOptions = subjects;
      this.subjectFilteredOptions = this.materia.valueChanges.pipe(
        startWith(""),
        map((value) => this._filter(value))
      );
      this.subjectStringOptions = [];
      this.subjectHashOptions = Object.create(null);
      this.subjectOptions.map((subjects) => {
        this.subjectStringOptions.push(subjects.name);
        this.subjectHashOptions[subjects.name] = subjects.id;
      });
    });
  }

  private _filter(value: any): Subjects[] {
    const filterValue = value.toLowerCase();
    if (this.subjectOptions) {
      return this.subjectOptions.filter(
        (option) => option.name.toLowerCase().indexOf(filterValue) === 0
      );
    }
  }

  isChecked(hour, day): boolean {
    let optionIndex = this.selectedDayHours.indexOf(
      JSON.stringify({ dia: day, hora: hour })
    );
    return optionIndex != -1;
  }

  checkDayHour(hour, day) {
    let optionIndex = this.selectedDayHours.indexOf(
      JSON.stringify({ dia: day, hora: hour })
    );
    if (optionIndex == -1) {
      this.selectedDayHours.push(JSON.stringify({ dia: day, hora: hour }));
      this.checkCounts += 1;
    } else {
      this.selectedDayHours.splice(optionIndex, 1);
      this.checkCounts -= 1;
    }
  }

  ngOnInit(): void {
    this.loadingBar.start();
    this.getRoomDetails();
    this.initReservationForm();
    this.getMateriasOptions();
    this.setSpecificWeekValidator();
    this.listenSpecifWeekChanges();
    this.loadingBar.complete();
  }

  onSubmit(): void {
    this.loadingBar.start();
    this.checkCountsError = this.checkCounts == 0;
    if (!this.checkCountsError && this.reservationForm.valid) {
      let requester = this.coreService.getuserId();
      let reservationWithHours = [];
      let hourJsonParse = this.selectedDayHours.map((dayHour) => {
        return JSON.parse(dayHour);
      });
      let reservation: createReservation = {
        requester: requester,
        subject: this.subjectHashOptions[this.reservationForm.value.materia],
        room: this.roomId,
        quantity: this.cantidad.value,
        material: this.requerimientosAdicionales.value,
        semanas:
          this.semanas.value == "especifica"
            ? this.semanaEspecifica.value
            : this.semanas.value,
      };
      reservationWithHours.push(reservation);
      reservationWithHours.push(...hourJsonParse);
      this.dashboardService.createRequest(reservationWithHours).subscribe(
        (response) => {
          $.notify(
            {
              icon: "check",
              message: "Su reservación ha sido realizada con éxito",
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
          this.router.navigate(["/dashboard/rooms-details", this.roomId]);
        },
        (error) => {
          console.log(error);
          $.notify(
            {
              icon: "error_outline",
              message: "Ups! Parece que hubo un error al crear su solicitud.",
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
      );
    }
    this.loadingBar.complete();
  }

  get materia() {
    return this.reservationForm.get("materia");
  }
  get cantidad() {
    return this.reservationForm.get("cantidad");
  }
  get semanas() {
    return this.reservationForm.get("semanas");
  }
  get requerimientosAdicionales() {
    return this.reservationForm.get("requerimientosAdicionales");
  }
  get semanaEspecifica() {
    return this.reservationForm.get("semanaEspecifica");
  }
}
