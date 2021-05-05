import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardGuard implements CanActivate {
  constructor(private   router: Router ) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return true;
    }
    this.router.navigate(['/home/login'])
    return false;
  }
  
}
