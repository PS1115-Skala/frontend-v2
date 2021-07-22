import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Room } from "../models/room";
import { User } from "app/core/models/user";
import { CoreService } from "app/core/services/core.service";
import { Item } from "../models/item";
import { Subjects } from "../models/subjects";
import { Reservation } from "../models/reservation";
import { USER_TYPE } from "app/core/constants/userType";

const API = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient, private coreService: CoreService) {}

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

  /** Servicio para consultar las salas que pertenencen a los administradores de Salas
   * @param {string} userId Id de Usuario a consultar salas
   * @returns {Rooms[]} Lista de Salas que pertenecen al usuario userId
   */
  getRoomsAdminLab(userId: string): Observable<Room[]> {
    const url = `${API}/salas/admin/${userId}/`;
    return this.http.get<Room[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para consultar todas las salas
   *
   * @returns {Rooms[]}
   */
  getAllRooms(): Observable<Room[]> {
    const url = `${API}/salas/`;
    return this.http.get<Room[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para consultar los detalles de la sala roomId
   *
   * @param {string} roomId Id de la sala a consultar detalles
   * @returns {Rooms[]}
   */
  getRoomDetails(roomId: string): Observable<Room[]> {
    const url = `${API}/salas/${roomId}/`;
    return this.http.get<Room[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para consultar los items de una sala
   *
   * @param {string} roomId Id de la sala a consultar items
   * @returns {Item[]}
   */
  getRoomItems(roomId: string): Observable<Item[]> {
    const url = `${API}/salas/${roomId}/items/`;
    return this.http.get<Item[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para consultar las materias disponibles
   * @returns {Subjects[]}
   */
  getSubjects(): Observable<Subjects[]> {
    const url = `${API}/subjects/`;
    return this.http.get<Subjects[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para consultar el horario disponible de una Sala
   *  @param {string} roomId Id de la sala a consultar items
   *  @param {string} semanas semana a consultar
   * @returns {Reservation[]}
   */
  getReservationsSchedule(idSala: string, typeWeek: string): Observable<Reservation[]> {
    const url = `${API}/reservas/${idSala}/semana/${typeWeek}/`;
    return this.http.get<Reservation[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para crear una solicitud o reserva de sala.
   * @param {Reservation and dayHours} reservacion junto a su hora y dias de reserva.
   * @returns {any} 204 si es exitosa
   */
  createRequest(reservation): Observable<any> {
    let userType = this.coreService.getuserType();
    let isAdmin = userType == USER_TYPE.LAB_ADMIN;
    let url = isAdmin
      ? `${API}/crear/reserva/`
      : `${API}/crear/solicitudes/reserva/`;
    return this.http
      .post<any>(url, reservation)
      .pipe(catchError(this.handleError));
  }

  /** Servicio para obtener todos los items del sistema que no posee una sala
   *  @param {string} roomId Id de la sala a consultar los items que no posee
   *  @returns {Item[]} Nombre de los items
   */
  getNotItems(roomId: string): Observable<Item[]> {
    const url = `${API}/not/items/${roomId}/`;
    return this.http.get<Item[]>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para eliminar un item de sala
   * @param {roomId} id de sala
   * @param {itemId} id de item a eliminar
   * @returns {any} 204 si es exitosa
   */
  deleteItemSala(roomId: string, itemId: string): Observable<any> {
    const url = `${API}/salas/${roomId}/${itemId}/`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  /** Servicio para agregar un item de sala
   * @param {roomId} id de sala
   * @param {itemId} id de item a eliminar
   * @param {quantity} Cantidad de items
   * @returns {any} 204 si es exitosa
   */
  addItemSala(
    roomId: string,
    itemId: string,
    quantity: number
  ): Observable<any> {
    const url = `${API}/salas/${roomId}/${itemId}/`;
    return this.http
      .post<any>(url, { quantity: quantity })
      .pipe(catchError(this.handleError));
  }

  /** Servicio para editar un item de sala
   * @param {roomId} id de sala
   * @param {itemId} id de item a eliminar
   * @param {quantity} Cantidad de items
   * @returns {any} 204 si es exitosa
   */
  editItemSala(
    roomId: string,
    itemId: string,
    quantity: number
  ): Observable<any> {
    const url = `${API}/salas/${roomId}/${itemId}/`;
    return this.http
      .put<any>(url, { quantity: quantity })
      .pipe(catchError(this.handleError));
  }
  /** Servicio para modificar una sala
   * @param {roomId} id de la sala
   * @param {name} name de la sala
   * @param {description} description de la sala
   * @param {status} status de la sala
   * @returns {any} 204 si es exitosa
   */
  editRoom(roomId: string, name: string, description: string, status: boolean) {
    const url = `${API}/salas/${roomId}/`;
    return this.http
      .put<any>(url, {
        name: name,
        description: description,
        is_active: String(status),
      })
      .pipe(catchError(this.handleError));
  }

  /** Servicio para modificar imagen de sala
   * @param {roomId} id de la sala
   * @param {image} img de la sala
   * @returns {any} 204 si es exitosa
   */
  editImageRoom(roomId: string, image: string) {
    const url = `${API}/salas/${roomId}/picture/new/`;
    return this.http
      .post<any>(url, { picture: image })
      .pipe(catchError(this.handleError));
  }

  /** Servicio crear una reserva de eliminación
   * @param {roomId} roomId id de la sala
   * @param {typeWeek} typeWeek semana a consultar
   * @param {scheduleList} scheduleList lista con los horarios a eliminar
   * @returns {any} 204 si es exitosa
   */
  createRequestToDelete(room: string, typeWeek: string, scheduleList: any[]): Observable<any>{
    const url = `${API}/eliminar/reserva`;
    const body = [];
    const request = {
      room: room,
      semanas: parseInt(typeWeek) ? parseInt(typeWeek) : typeWeek
    };
    body.push(request);
    body.push(...scheduleList);
    return this.http
      .post<any>(url, body)
      .pipe(catchError(this.handleError));
  }
}
