import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from '../../conatants/role.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      
      if(currentUser && (currentUser.role === ROLE.ADMIN || currentUser.role === ROLE.USER)){
        // if(currentUser) {
          // if ((currentUser.role === ROLE.ADMIN && this.router.url == '/admin') || (currentUser.role === ROLE.USER) && this.router.url == '/cabitet')
        //   if (currentUser.role === ROLE.USER) this.router.navigate(['cabinet']);
        // if(currentUser.role === ROLE.USER) {
        //   this.router.navigate(['/cabinet']);
        // } else if(currentUser.role === ROLE.ADMIN){
        //   this.router.navigate(['/admin']);
        // }
        return true;
      } 
      this.router.navigate(['']);
      return false;
    }
  
}
