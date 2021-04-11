import { Component, OnInit } from '@angular/core';
import { Room } from "../../../dashboard/models/room";
import { AdminLab } from "../../models/adminLab";
import { DashboardService } from "../../../dashboard/services/dashboard.service";
import { LaboratoriesService } from "../../services/laboratories.service";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-list-laboratories-page',
  templateUrl: './list-laboratories-page.component.html',
  styleUrls: ['./list-laboratories-page.component.css']
})
export class ListLaboratoriesPageComponent implements OnInit {

  public allRooms: Room[] = [];
  public allAdmins: AdminLab[] = [];
  private roomGroupByAdmin  = {};

  constructor(
    private dashboardService: DashboardService,
    private laboratoriesService: LaboratoriesService,
  ) { }

  ngOnInit(): void {

    let rooms = this.dashboardService.getAllRooms();
    let admins = this.laboratoriesService.getAdminLabs();

    forkJoin({
      rooms: rooms,
      admins: admins,
    }).subscribe(({ rooms, admins }) => {
      this.allRooms = rooms;
      this.allAdmins = admins;
      this.createListOfRoomGroupByAdmin();
    });

  }

  createListOfRoomGroupByAdmin(){
    this.allAdmins.forEach(element => {
      this.roomGroupByAdmin[element.id] = [];
    });
    this.allRooms.forEach(element => {
      this.roomGroupByAdmin[element.manager_id].push(element);
    });
  }
}