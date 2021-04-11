import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { LaboratoriesService } from "app/features/laboratories/services/laboratories.service";
declare var $: any;
import * as Chartist from "chartist";
import { Subject } from "rxjs";
import { MetricsResponse } from "../../models/metrics-response";
import { MetricsService } from "../../services/metrics.service";

@Component({
  selector: "app-room-stats",
  templateUrl: "./room-stats.component.html",
  styleUrls: ["./room-stats.component.css"],
})
export class RoomStatsComponent implements OnInit {
  public selectedRoom: any;
  public rooms: any[];
  public terms: any[] = [];
  public bookingByTerms: number[] = [];
  public selectedBeginTerm: any = undefined;
  public selectedEndTerm: any = undefined;
  public seriesBookingByTerms: number[] = [];
  public seriesNumberStudents: number[] = [];
  public seriesItemsByTerms: number[] = [];
  public totalBookingNumber: number = 0;
  public totalStudents: number = 0;
  public filterBy: string[] = [
    "Trimestre",
    "Rango de Trimestres",
    "Históricos",
  ];
  public selectedfilterBy: string;
  public filterByHistoric: boolean = false;
  public filterByTerm: boolean = true;
  public metricsResponse: MetricsResponse;
  public cardsMetrics: any[] = [];
  is_admin: boolean;
  public careersName: any = {
    "0": "Cortas",
    "1": "Largas",
    "2": "PostGrado",
  };
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  dtTrigger3: Subject<any> = new Subject<any>();
  dtTrigger4: Subject<any> = new Subject<any>();

  constructor(
    private laboratorieService: LaboratoriesService,
    private metricsService: MetricsService
  ) {}

  initTableOption() {
    for (let index = 0; index < 4; index++) {
      this.dtOptions[index] = {
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
  }

  rerenderTables(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
    });
    this.dtTrigger1.next();
    this.dtTrigger2.next();
    this.dtTrigger3.next();
    this.dtTrigger4.next();
  }

  getRooms() {
    this.laboratorieService.getAdminLabs().subscribe((response) => {
      this.rooms = response;
      this.rooms.push({ name: "Todos los laboratorios", id: undefined });
      this.selectedRoom = this.rooms[this.rooms.length - 1];
    });
  }

  getTerms() {
    this.metricsService.getTrimesters().subscribe((response) => {
      this.terms = response;
      this.selectedBeginTerm = this.terms[0];
      this.selectedEndTerm = this.terms[0];
    });
  }

  getMetrics() {
    this.metricsService
      .getMetrics(
        this.selectedRoom,
        this.selectedBeginTerm,
        this.selectedEndTerm
      )
      .subscribe((response) => {
        this.metricsResponse = response;
        this.rerenderTables();
        if (this.metricsResponse) {
          this.initCardsMetrics();
          this.initAllCharts();
        }
      });
  }

  changeSelectedRoom(index) {
    this.selectedRoom = this.rooms[index];
    this.getMetrics();
  }

  showValidationError(errorMessage) {
    $.notify(
      {
        icon: "error_outline",
        message: errorMessage,
      },
      {
        type: "danger",
        timer: 2000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }

  initAllCharts() {
    this.initApprovedVsRejected();
    this.initCareersChart();
    this.initStudentsChart();
  }

  changeFilterBy(indexFilter) {
    this.selectedfilterBy = this.filterBy[indexFilter];
    // Activamos o desactivamos controles booleanos
    // sabiendo por la posicion del index filterby que filtro tenemos
    switch (indexFilter) {
      // Por trimestre
      case 0:
        this.filterByTerm = true;
        this.filterByHistoric = false;
        this.selectedEndTerm = this.selectedBeginTerm;
        this.getMetrics();
        break;
      // Por rango de trimestre
      case 1:
        this.filterByTerm = false;
        this.filterByHistoric = false;
        this.selectedEndTerm = this.selectedBeginTerm;
        this.getMetrics();
        break;
      // Por historico
      case 2:
        this.filterByTerm = false;
        this.filterByHistoric = true;
        this.selectedEndTerm = undefined;
        this.selectedBeginTerm = this.terms[this.terms.length - 1];
        this.getMetrics();
        break;
    }
  }

  changeSelectedBeginTerm(trimester) {
    // El inicio de trimestre se debe manejar dependiendo del filtro en el que estamos
    // Filtro por trimestre
    if (this.filterByTerm && !this.filterByHistoric) {
      this.selectedBeginTerm = trimester;
      this.selectedEndTerm = trimester;
      this.getMetrics();
      return;
    }
    // Validacion en Rango de trimestre
    if (trimester.finish > this.selectedEndTerm.finish) {
      return this.showValidationError(
        "El trimestre de inicio debe ser anterior al de finalización"
      );
    }
    this.selectedBeginTerm = trimester;
    this.getMetrics();
  }

  changeSelectedEndTerm(trimester) {
    if (trimester.start < this.selectedBeginTerm.start) {
      return this.showValidationError(
        "El trimestre de finalización debe ser posterior al de inicio"
      );
    }
    this.selectedEndTerm = trimester;
    this.getMetrics();
  }

  createBarChart(labels, series, divId) {
    let Chart = {
      labels: labels,
      series: [series],
    };
    let highValue = Math.max(...series) + 1;
    let optionsChart = {
      low: 0,
      high: highValue, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };
    new Chartist.Bar(divId, Chart, optionsChart);
  }

  initApprovedVsRejected() {
    let labels = this.metricsResponse.requestStatus.status;
    let series = this.metricsResponse.requestStatus.request;
    this.createBarChart(labels, series, "#approvedVsRejected");
  }

  initCareersChart() {
    let labels = ["C. Largas", "C. Cortas", "Postgrado"];
    let series = [
      this.metricsResponse.careers.undergraduateLarge.count,
      this.metricsResponse.careers.undergraduateShort.count,
      this.metricsResponse.careers.postgraduate.count,
    ];
    this.createBarChart(labels, series, "#careersChart");
  }

  initStudentsChart() {
    let labels = ["C. Largas", "C. Cortas", "Postgrado"];
    let series = [
      this.metricsResponse.careers.undergraduateLarge.totalStudents,
      this.metricsResponse.careers.undergraduateShort.totalStudents,
      this.metricsResponse.careers.postgraduate.totalStudents,
    ];
    this.createBarChart(labels, series, "#studentsChart");
  }

  initCardsMetrics() {
    this.cardsMetrics = [];
    let totalStudents = {
      icon: "done",
      title: "Número de estudiantes atendidos",
      stat: this.metricsResponse.totalStudents,
    };
    let totalStudentsLarge = {
      icon: "done",
      title: "Número de estudiantes atendidos Carreras Largas",
      stat: this.metricsResponse.careers.undergraduateLarge.totalStudents,
    };
    let totalStudentsShort = {
      icon: "done",
      title: "Número de estudiantes atendidos Carreras Cortas",
      stat: this.metricsResponse.careers.undergraduateShort.totalStudents,
    };
    let totalStudentsPostGraduate = {
      icon: "done",
      title: "Número de estudiantes atendidos PostGrado",
      stat: this.metricsResponse.careers.postgraduate.totalStudents,
    };
    let totalSubjects = {
      icon: "done",
      title: "Asignaturas Atendidas",
      stat: this.metricsResponse.subjects.count,
    };
    let totalDeparments = {
      icon: "done",
      title: "Departamentos Atendidos",
      stat: this.metricsResponse.department.count,
    };
    let totalCareers = {
      icon: "done",
      title: "Carreras Totales Atendidas",
      stat: this.metricsResponse.careers.count,
    };
    let totalLargeCarers = {
      icon: "done",
      title: "Carreras Largas Atendidas",
      stat: this.metricsResponse.careers.undergraduateLarge.count,
    };
    let totalPostgraduateCountCarers = {
      icon: "done",
      title: "Carreras de Postgrado Atendidas",
      stat: this.metricsResponse.careers.postgraduate.count,
    };
    let totalShortCountCarers = {
      icon: "done",
      title: "Carreras Cortas Atendidas",
      stat: this.metricsResponse.careers.undergraduateShort.count,
    };
    this.cardsMetrics.push(
      totalStudents,
      totalStudentsLarge,
      totalStudentsShort,
      totalStudentsPostGraduate,
      totalSubjects,
      totalDeparments,
      totalCareers,
      totalLargeCarers,
      totalPostgraduateCountCarers,
      totalShortCountCarers
    );
  }

  getMetricsCSV() {
    this.metricsService
      .getMetricsCSV(
        this.selectedRoom,
        this.selectedBeginTerm,
        this.selectedEndTerm
      )
      .subscribe(
        () => {},
        (error) => {
          this.showValidationError("Error al obtener el csv de estadisticas");
        }
      );
  }

  ngOnInit() {
    this.initTableOption();
    this.getRooms();
    this.getTerms();
    this.getMetrics();
    this.selectedfilterBy = this.filterBy[0];
  }

  ngAfterViewInit(): void {
    this.dtTrigger1.next();
    this.dtTrigger2.next();
    this.dtTrigger3.next();
    this.dtTrigger4.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger3.unsubscribe();
    this.dtTrigger4.unsubscribe();
  }
}
