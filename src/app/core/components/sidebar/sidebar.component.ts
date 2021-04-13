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
export let ROUTES: RouteInfo[] = [];

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
    this.userName = localStorage.getItem("userName");
    this.trimester = localStorage.getItem("term");
    ROUTES = [
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
    if (!this.userName) {
      this.coreService.getUserDetails(userId).subscribe((user) => {
        localStorage.setItem("userName", user[0].name);
        this.userName = user[0].name;
      });
    }
    if (!this.trimester) {
      this.coreService.getTrimester().subscribe((term) => {
        localStorage.setItem("term", term[0].id);
        this.trimester = term[0].id;
      });
    }
    this.menuItems = ROUTES;
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
      path: "/admin-labf",
      title: "Administrar",
      icon: "notifications",
      class: "",
    });
  }

  addNewRoomsRoute() {
    this.menuItems.push({
      path: "/admin-rooms",
      title: "Administracion de Salas",
      icon: "notifications",
      class: "",
    });
  }

  addUsuariosRoute() {
    this.menuItems.push({
      path: "/admin-users",
      title: "Usuarios",
      icon: "people",
      class: "",
    });
  }

  addMetricRoute() {
    this.menuItems.push({
      path: "/metrics",
      title: "Métricas",
      icon: "analytics",
      class: "",
    });
  }
}
