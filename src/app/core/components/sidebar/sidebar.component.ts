import { Component, OnInit } from "@angular/core";
import { USER_TYPE } from "app/core/constants/userType";
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
  {
    path: "/laboratories/all",
    title: "Laboratorios",
    icon: "desktop_windows",
    class: "",
  },
  {
    path: "/special-requests/list",
    title: "Reservas Especiales",
    icon: "flare",
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
    let userType = this.coreService.getuserType();
    this.coreService.getUserDetails(userId).subscribe((user) => {
      this.userName = user[0].name;
    });
    this.coreService.getTrimester().subscribe((term) => {
      this.trimester = term[0].id;
    });
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    if (userType == USER_TYPE.LAB_F) {
      this.addAdminRoute();
      this.addUsuariosRoute();
      this.addMetricRoute();
    }
    if (userType == USER_TYPE.LAB_ADMIN) {
      this.addNewRoomsRoute();
    }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  addAdminRoute() {
    this.menuItems.push({
      path: "/labf-admin",
      title: "Administrar",
      icon: "notifications",
      class: "",
    });
  }

  addNewRoomsRoute() {
    this.menuItems.push({
      path: "/new-rooms",
      title: "Nuevas Salas",
      icon: "notifications",
      class: "",
    });
  }

  addUsuariosRoute() {
    this.menuItems.push({
      path: "/usuarios",
      title: "Usuarios",
      icon: "people",
      class: "",
    });
  }

  addMetricRoute() {
    this.menuItems.push({
      path: "/metricas",
      title: "Métricas",
      icon: "analytics",
      class: "",
    });
  }
}
