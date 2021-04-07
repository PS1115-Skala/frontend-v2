import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "app/core/models/user";
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
  getUsers(userType?: "admin" | "profesor" | string): Observable<User[]> {
    if (userType == "admin" || userType == "profesor") {
      return this.http.get<User[]>(API + "/usuarios/" + userType);
    } else if (userType != undefined) {
      console.warn(
        "El parametro de tipo de usuario no es reconocido ",
        userType
      );
    }
    return this.http.get<User[]>(API + "/usuarios/");
  }

    /** Servicio para consultar usuario
   *
   * @param {string} userId Id de Usuario
   * @returns {User}
   */
     getUser(userId: string): Observable<User> {
      return this.http.get<User>(`${API}/usuario/${userId}`);
    }
  
    /** Crear Usuario desde pantalla de usuarios
     *
     * @param {usbId: string, userName: string, userEmail: string, userType: number} usuarioBasico
     */
    createUser(usuarioBasico: { usbId: string, userName: string, userEmail: string, userType: number }
    ): Observable<any> {
      return this.http.post<any>(API + "/usuario/create", usuarioBasico);
    }
  
    /** Actualizar los campos que se toquen de usuario
     *
     * @param id
     * @param {{name: string, email: string, type: number, is_verified: boolean, is_active: number, chief: string }} user
     */
    updateUser( 
      id: string,
      user: { name: string, email: string, type: number, is_verified: boolean, is_active: number, chief: string }
    ): Observable<any> {
      return this.http.put<any>(API + `/usuario/update/${id}`, user);
    }
}
