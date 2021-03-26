import { Component, Input, OnInit } from "@angular/core";
import { DashboardService } from "../../services/dashboard.service";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { Room } from "../../models/room";
import { environment } from "environments/environment";
import * as $ from "jquery";
import { User } from "app/core/models/user";
import { USER_TYPE } from "app/core/constants/userType";
import { CoreService } from "app/core/services/core.service";
@Component({
  selector: "app-list-rooms",
  templateUrl: "./list-rooms.component.html",
  styleUrls: ["./list-rooms.component.css"],
})
export class ListRoomsComponent implements OnInit {
  private allRooms: Room[] = [];
  private _filter: string = "";
  private filteredRooms: Room[] = [];
  private user: User;

  constructor(
    private dashboardService: DashboardService,
    private loadingBar: LoadingBarService,
    private coreService: CoreService
  ) {}

  @Input() set filter(value: string) {
    this._filter = value;
    this.applyFilter();
  }

  startLoading() {
    this.loadingBar.start();
  }

  stopLoading() {
    this.loadingBar.complete();
  }

  loadImages() {
    this.filteredRooms.forEach((room) => {
      room.path_image = environment.api_url + "/salas/" + room.id + "/picture";
    });
  }

  applyFilter() {
    const filter = this._filter.trim().toLowerCase();
    let newRooms = this.allRooms.filter(
      (room) =>
        room.description.toLowerCase().includes(filter) ||
        room.name.toLowerCase().includes(filter) ||
        room.owner_id.toLowerCase().includes(filter) ||
        room.manager_id.toLowerCase().includes(filter) ||
        room.id.includes(filter)
    );
    this.filteredRooms = [...newRooms];
  }

  resetFilter() {
    $('input[name="filter"]').val("");
    this._filter = "";
    this.applyFilter();
  }

  getRooms() {
    let userType = this.coreService.getuserType();
    let userId = this.coreService.getuserId();
    if (userType == USER_TYPE.LAB_ADMIN) {
      this.dashboardService
        .getRoomsAdminLab(userId)
        .subscribe((rooms: Room[]) => {
          this.allRooms = [...rooms];
          this.filteredRooms = [...rooms];
          this.loadImages();
        });
    } else {
      this.dashboardService.getAllRooms().subscribe((rooms: Room[]) => {
        this.allRooms = [...rooms];
        this.filteredRooms = [...rooms];
        this.loadImages();
      });
    }
  }

  ngOnInit(): void {
    this.startLoading();
    this.getRooms();
    this.stopLoading();
  }
}
