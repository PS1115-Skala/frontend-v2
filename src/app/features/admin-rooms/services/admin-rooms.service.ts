import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class AdminRoomsService {
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
  
  /** Servicio para consultar todas las solicitudes de sala
   * @param id
   * @returns {any[]} Lista de usuarios de tipo administrador de laboratorio
   */
  getRoomRequests(id: string): Observable<any[]> {
    const url = `${API}/sala/solicitudes/crear/${id}/`;
    return this.http.get<any[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para consultar todas las solicitudes de sala
   * @param id
   * @returns {any[]} Lista de usuarios de tipo administrador de laboratorio
   */
  postRoomRequest(id: string, room_id: string): Observable<any> {
    const url = `${API}/sala/solicitudes/crear/${id}/`;
    return this.http.post<any>(url, {room_id: room_id}).pipe(catchError(this.handleError));
  }

}
