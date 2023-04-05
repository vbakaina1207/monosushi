import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from '../../constants/role.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public currentUser!: any;

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

      if(this.currentUser && (this.currentUser.role === ROLE.ADMIN || this.currentUser.role === ROLE.USER)){
        return true;
      }
      this.router.navigate(['']);
      return false;
    }

}
