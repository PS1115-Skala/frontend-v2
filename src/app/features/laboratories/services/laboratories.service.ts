import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class LaboratoriesService {
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

  /** Servicio para consultar todos los usuarios de tipo administrador de sala
   * @param {string} userId Id de Usuario a consultar salas
   * @returns {Rooms[]} Lista de Salas que pertenecen al usuario userId
   */
  getAdminLabs(): Observable<any[]> {
    const url = `${API}/usuarios/admin/`;
    return this.http.get<any[]>(url).pipe(catchError(this.handleError));
  }

}
