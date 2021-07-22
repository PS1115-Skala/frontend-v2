import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { USER_TYPE } from '../constants/userType';
import { CoreService } from '../services/core.service';

@Injectable({
  providedIn: 'root'
})
export class LabFGuard implements CanActivate, CanActivateChild {

  constructor(private coreService: CoreService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.coreService.getuserType() != USER_TYPE.LAB_F) { return false; }
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.coreService.getuserType() != USER_TYPE.LAB_F) { return false; }
    return true;
  }
  
}
