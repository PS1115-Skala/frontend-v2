import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class AdminUsersService {
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

  /** Servicio para consultar usuarios
   *
   * @param {'admin'|'profesor'|string} userType Tipos de usuarios
   * @returns {User[]}
   */
  getUsers(userType?: "admin" | "profesor" | string): Observable<any[]> {
    if (userType == "admin" || userType == "profesor") {
      return this.http.get<any[]>(API + "/usuarios/" + userType);
    } else if (userType != undefined) {
      console.warn(
        "El parametro de tipo de usuario no es reconocido ",
        userType
      );
    }
    return this.http.get<any[]>(API + "/usuarios/");
  }
}
