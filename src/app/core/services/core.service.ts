import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { User } from "app/core/models/user";
import { JwtHelperService } from "@auth0/angular-jwt";
import decode from "jwt-decode";
import { Trimester } from "../models/trimester";
import { Router } from "@angular/router";
declare var $: any;

const API = environment.api_url;
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: "root",
})
export class CoreService {
  constructor(private http: HttpClient, private router: Router) {}

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
    const token = this.getToken();
    return !jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  logout(unauthorized: boolean) {
    localStorage.clear();
    if (unauthorized) { this.errorNotification('Debe Iniciar Sesión, aún no tiene permiso para esta opción'); }
    this.router.navigate(['auth/login']);
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

  successNotification(message: string) {
    $.notify(
      { icon: "check", message: message,},
      {
        type: "success",
        timer: 5000,
        placement: { from: "top", align: "right", },
      }
    );
  }

  errorNotification(message: string) {
    $.notify(
      { icon: "error_outline", message: message },
      {
        type: "danger",
        timer: 5000,
        placement: { from: "top", align: "right", },
      }
    );
  }
}
