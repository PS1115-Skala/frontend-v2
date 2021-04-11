import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trimester } from "app/core/models/trimester";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MetricsResponse } from "../models/metrics-response";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class MetricsService {
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

  getTrimesters(): Observable<Trimester[]> {
    const url = `${API}/trimestre/todos/`;
    return this.http.get<Trimester[]>(url).pipe(catchError(this.handleError));
  }

  getMetricsParams(labFilter?: any, initTrim?: any, endTrim?: any) {
    let params = {};
    if (labFilter && labFilter.id) {
      params["labFilter"] = labFilter.id;
    }
    if (initTrim) {
      params["initTrim"] = initTrim.id;
    }
    if (endTrim) {
      params["endTrim"] = endTrim.id;
    }
    return params;
  }

  getMetrics(
    labFilter?: any,
    initTrim?: any,
    endTrim?: any
  ): Observable<MetricsResponse> {
    const url = `${API}/metrics/reservas/`;
    let params = this.getMetricsParams(labFilter, initTrim, endTrim);
    return this.http
      .get<MetricsResponse>(url, {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  getMetricsCSV(
    labFilter?: any,
    initTrim?: any,
    endTrim?: any
  ): Observable<MetricsResponse> {
    const url = `${API}/metrics/reservas/csv/`;
    let params = this.getMetricsParams(labFilter, initTrim, endTrim);
    return this.http
      .get<MetricsResponse>(url, {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }
}
