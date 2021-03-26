import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { throwError } from "rxjs";

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
}
