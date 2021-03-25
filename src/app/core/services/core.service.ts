import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { User } from "app/core/models/user";
import { JwtHelperService } from "@auth0/angular-jwt";
import decode from "jwt-decode";
import { Trimester } from "../models/trimester";

const API = environment.api_url;
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: "root",
})
export class CoreService {
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

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  logout(unauthorized: boolean) {
    localStorage.clear();
  }

  /** Servicio para consultar id usuario.
   *
   */
  getuserId(): string {
    const token = localStorage.getItem("token");
    const tokenPayload = decode(token);
    return tokenPayload["id"];
  }

  /** Servicio para consultar tipo de usuario.
   *
   */
  getuserType(): number {
    const token = localStorage.getItem("token");
    const tokenPayload = decode(token);
    return tokenPayload["type"];
  }

  /** Servicio para consultar detalles de un usuario.
   *
   * @returns {User}
   */
  getUserDetails(userId: string): Observable<User[]> {
    return this.http
      .get<User[]>(`${API}/usuario/${userId}/`)
      .pipe(catchError(this.handleError));
  }

  /** Servicio para consultar el trimestre activo.
   *
   * @returns {Trimester}
   */
  getTrimester(): Observable<Trimester[]> {
    return this.http.get<Trimester[]>(`${API}/trimestre/ultimo/`);
  }
}
