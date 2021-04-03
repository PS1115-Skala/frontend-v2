import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { RequestsResponse } from "../models/requests-response";
import { RequestsResponseAdmin } from "../models/requests-response-admin";
import { ScheduleResponse, ScheduleAsignation } from "../models/schedule-response";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class RequestsService {
  /** Funcion para manejo de errores
   *
   * @param {HttpErrorResponse} error
   * @returns {Error}
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  constructor(private http: HttpClient) {}

  /** Servicio para consultar las solicitudes de reserva de un administrador de laboratorio
   * @param {string} userId Id de Usuario a consultar solicitudes
   * @returns {RequestsResponseAdmin[]} Lista de solicitudes que pertenecen al usuario userId
   */
  getRequestsAdminLab(userId: string): Observable<RequestsResponseAdmin[]> {
    const url = `${API}/solicitudes/admin/${userId}/`;
    return this.http
      .get<RequestsResponseAdmin[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** Servicio para consultar las solicitudes que pertenecen a un usuario.
   * @param {string} userId Id de Usuario a consultar salas
   * @returns {RequestsResponse[]} Lista de solicitudes que pertenecen al usuario userId
   */
  getRequestsUser(userId: string): Observable<RequestsResponse[]> {
    const url = `${API}/solicitudes/usuario/${userId}/`;
    return this.http
      .get<RequestsResponse[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** Servicio para consultar el horario correspondiente a una reserva.
   * @param {string} requestId Id de Usuario a consultar salas
   * @returns {ScheduleResponse} Objeto con informacion y la lista de horarios correspondiente a un requestId
   */
  getScheduleRequest(requestId: string): Observable<ScheduleResponse> {
    const url = `${API}/solicitudes/${requestId}/horario`;
    return this.http
      .get<ScheduleResponse>(url)
      .pipe(catchError(this.handleError));
  }

  /** Servicio para consultar el horario correspondiente a una sala
   * @param {string} room Sala de la que se reunirá 
   * @param {string} typeWeek Tipo de semana a consultar
   * @returns {ScheduleAsignation} Lista de horario correspondiente a una sala
   */
  getSchedule(room: string, typeWeek: string): Observable<ScheduleAsignation[]> {
    const url = `${API}/reservas/${room}/semana/${typeWeek}`;
    return this.http
      .get<ScheduleAsignation[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** A través de este servicio se aprueba/rechaza una solicitud de reserva
   * @param {string} requestId Reserva que se aprobará/rechazará 
   * @param {string} decision Decisión tomada (aprobada o rechazada)
   * @param {string} reason Razón de rechazo (en caso de rechazo)
   * @returns {ScheduleAsignation} Lista de horario correspondiente a una sala
   */
  reservationRequestDecision(requestId: string, decision: string, reason=''): Observable<any> {
    const url = `${API}/solicitudes/reserva/${requestId}`;
    const putData = { reason, status: decision };
    return this.http
      .put(url, putData)
      .pipe(catchError(this.handleError));
  }
}
