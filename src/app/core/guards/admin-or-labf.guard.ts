import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { USER_TYPE } from '../constants/userType';
import { CoreService } from '../services/core.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrLabfGuard implements CanActivate, CanActivateChild {
  
  constructor(private coreService: CoreService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.coreService.getuserType() != USER_TYPE.LAB_ADMIN && 
      this.coreService.getuserType() != USER_TYPE.LAB_F) { 
        if (state.url.includes('special-requests')) {
          this.router.navigate(['special-requests/']);
        }
        return false; 
      }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.coreService.getuserType() != USER_TYPE.LAB_ADMIN && 
      this.coreService.getuserType() != USER_TYPE.LAB_F) { 
        if (state.url.includes('special-requests')) {
          this.router.navigate(['special-requests/']);
        }
        return false; 
      }
    return true;
  }
  
}
