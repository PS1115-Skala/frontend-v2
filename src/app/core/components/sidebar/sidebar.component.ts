import { Component, OnInit } from "@angular/core";
import { CoreService } from "app/core/services/core.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard/list-rooms",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
  },
  {
    path: "/requests/all",
    title: "Solicitudes",
    icon: "notifications",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userName: String = "";
  trimester: String = "";

  constructor(private coreService: CoreService) {}

  ngOnInit() {
    let userId = this.coreService.getuserId();
    this.coreService.getUserDetails(userId).subscribe((user) => {
      this.userName = user[0].name;
    });
    this.coreService.getTrimester().subscribe((term) => {
      this.trimester = term[0].id;
    });
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
