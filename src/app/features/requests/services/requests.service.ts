import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { RequestsResponse } from "../models/requests-response";
import { RequestsResponseAdmin } from "../models/requests-response-admin";

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
   * @param {string} userId Id de Usuario a consultar salas
   * @returns {Rooms[]} Lista de Salas que pertenecen al usuario userId
   */
  getRequestsAdminLab(userId: string): Observable<RequestsResponseAdmin[]> {
    const url = `${API}/solicitudes/admin/${userId}/`;
    return this.http
      .get<RequestsResponseAdmin[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** Servicio para consultar las solicitudes que pertenecen a un usuario.
   *
   * @returns {Rooms[]}
   */
  getRequestsUser(userId: string): Observable<RequestsResponse[]> {
    const url = `${API}/solicitudes/usuario/${userId}/`;
    return this.http
      .get<RequestsResponse[]>(url)
      .pipe(catchError(this.handleError));
  }
}
