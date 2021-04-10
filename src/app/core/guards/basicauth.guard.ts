import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreService } from '../services/core.service';

@Injectable({
  providedIn: 'root'
})
export class BasicauthGuard implements CanActivate, CanActivateChild {

  constructor(private coreService: CoreService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.coreService.isLoggedIn()) {
        this.coreService.logout(true);
        return false;
      }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.coreService.isLoggedIn()) {
        this.coreService.logout(true);
        return false;
      }
    return true;
  }
  
}
