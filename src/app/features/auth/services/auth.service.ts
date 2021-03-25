import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginResponse } from "../models/loginresponse";
import { VerifyUSBIdentityResponse } from "../models/verifyUsbIdentityResponse";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class AuthService {
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

  /** Servicio para realizar login de un usuario.
   * @param {string} username nombre de Usuario a realizar login
   * @param {string} password contrasena del usuario
   * @returns
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const url = `${API}/usuario/signin/`;
    const payload = { usbId: username, clave: password };
    return this.http
      .post<LoginResponse>(url, { usbId: username, clave: password })
      .pipe(catchError(this.handleError));
  }

  /** Servicio para verificar el usbid y clave de un usuario.
   * @param {string} username nombre de Usuario a realizar login
   * @param {string} password contrasena del usuario en la usb
   * @returns
   */
  verifyUsbIdentity(
    usbId: string,
    password: string
  ): Observable<VerifyUSBIdentityResponse> {
    const url = `${API}/usuario/userInfo/`;
    return this.http
      .post<VerifyUSBIdentityResponse>(url, { usbId: usbId, clave: password })
      .pipe(catchError(this.handleError));
  }

  /** Servicio para crear una nueva clave a un usuario en el sistema.
   * @param {string} username nombre de Usuario a realizar login
   * @param {string} password1 contrasena
   * @param {string} password2 confirmacion de la contrasena
   * @returns
   */
  signUp(usbId: string, clave1: string, clave2: string): Observable<any> {
    const token = localStorage.getItem("tokenSignUp");
    const header = new HttpHeaders({
      "x-access-token": token,
    });
    const url = `${API}/usario/signup/`;
    return this.http
      .post<any>(url, { usbId, clave1, clave2 }, { headers: header })
      .pipe(catchError(this.handleError));
  }
}
