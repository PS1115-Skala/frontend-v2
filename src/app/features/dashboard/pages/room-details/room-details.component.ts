import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { environment } from "environments/environment";
import { Item } from "../../models/item";
import { Room } from "../../models/room";
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: "app-room-details",
  templateUrl: "./room-details.component.html",
  styleUrls: ["./room-details.component.css"],
})
export class RoomDetailsComponent implements OnInit {
  roomId: string;
  room: Room;
  picture: string;
  API = environment.api_url;
  items: Item[];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit(): void {
    this.loadingBar.start();
    this.route.params.subscribe((params) => {
      this.roomId = params["roomId"];
    });
    this.dashboardService.getRoomDetails(this.roomId).subscribe((room) => {
      this.room = room[0];
      this.picture = `${this.API}/salas/${this.roomId}/picture`;
    });
    this.dashboardService.getRoomItems(this.roomId).subscribe((items) => {
      this.items = items;
    });
    this.loadingBar.complete();
  }
}
