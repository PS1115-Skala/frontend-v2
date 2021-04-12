import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Trimester } from "../../../core/models/trimester";
import { RoomRequest } from "../models/roomrequest";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class AdminlabfService {
  constructor(private http: HttpClient) {}

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

  /** Servicio para actualizar la fecha de inicio y fin del trimestre actual
   * @param id
   * @param {{start: string, finish: string}}
   */
  putTrimester(id: string, start_finish: object): Observable<any> {
    const url = `${API}/trimestre/${id}/`;
    return this.http.put<any>(url, start_finish).pipe(catchError(this.handleError));
  }

  /** Servicio para consultar todas las solicitudes de sala
   * @returns {RoomRequest[]} Lista de usuarios de tipo administrador de laboratorio
   */
  getRoomRequests(): Observable<RoomRequest[]> {
    const url = `${API}/labf/solicitudes/`;
    return this.http.get<RoomRequest[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para aceptar o rechazar una solicitud de sala
   * @param id
   * @param status
   */
  putRoomRequests(id: string, status: string): Observable<any> {
    const url = `${API}/sala/solicitudes/${id}/`;
    return this.http.put<any>(url, {"status": status}).pipe(catchError(this.handleError));
  }

}