import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { SpecialReservation } from "../models/special-reservation";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class SpecialRequestsService {
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

  /** Consulta Reservas Especiales
   * 
   * @param lab 
   * @param trimestre 
   * @param id 
   * @returns 
   */
  getSpecialReservations(lab?: string, trimestre?: string, id?: number): Observable<any[]> {
    let endpoint = API + "/special";
    if (id) { endpoint = endpoint + `/${id}`; }
    let params = new HttpParams();
    if (lab) { params = params.append("lab", lab); }
    if (trimestre) { params = params.append("trim", trimestre); }

    return this.http.get<any[]>(endpoint, { params: params });
  }

  /** Consulta Reservas Especiales Por Usuario
  * 
  * @param idUser
  * @returns 
  */
  getUserSpecialReservations(idUser: string): Observable<any[]> {
    return this.http.get<any[]>(`${API}/special/user/${idUser}` );
  }

  /** crear reservarEspeciales 
   * 
   * Requiere Permisos de Logueado */
  createSpecialReservation(body: SpecialReservation, userId: string): Observable<any> {
    // body.reservation_day = this.datePipe.transform(body.reservation_day, 'yyyy-MM-dd')
    return this.http.post(API + `/special/create/${userId}`, body);
  }

  /** Borrar Reserva Especial
   * 
   * @param id 
   * @returns */
  deleteSpecialReservation(id: number): Observable<any> {
    return this.http.delete(API + `/special/${id}`);
  }

}
