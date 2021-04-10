import { Component, OnInit } from '@angular/core';
import { Room } from "../../../dashboard/models/room";
import { AdminLab } from "../../models/adminLab";
import { DashboardService } from "../../../dashboard/services/dashboard.service";
import { LaboratoriesService } from "../../services/laboratories.service";

@Component({
  selector: 'app-list-laboratories-page',
  templateUrl: './list-laboratories-page.component.html',
  styleUrls: ['./list-laboratories-page.component.css']
})
export class ListLaboratoriesPageComponent implements OnInit {

  public allRooms: Room[] = [];
  public allAdmins: AdminLab[] = [];
  private waitForIt: number = 0;
  private numToWait: number = 2;
  private roomGroupByAdmin  = {};
  constructor(
    private dashboardService: DashboardService,
    private laboratoriesService: LaboratoriesService,
  ) { }

  laboratorios: any[];
  ngOnInit(): void {
    this.laboratorios = [1,2,3,4,5];
    this.dashboardService.getAllRooms().subscribe((rooms: Room[]) => {
      this.allRooms = [...rooms];
      this.waitForIt += 1; 
      this.createListOfRoomGroupByAdmin();
    });
    this.laboratoriesService.getAdminLabs().subscribe((adminsList: AdminLab[]) => {
      this.allAdmins = [...adminsList];
      this.waitForIt += 1; 
      this.createListOfRoomGroupByAdmin();
    });
  }

  createListOfRoomGroupByAdmin(){
    if (this.numToWait == this.waitForIt){
      this.allAdmins.forEach(element => {
        this.roomGroupByAdmin[element.id] = [];
      });
      this.allRooms.forEach(element => {
        this.roomGroupByAdmin[element.manager_id].push(element);
      });
    }
  }
}