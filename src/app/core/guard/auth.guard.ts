import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../../features/auth/user.service';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      return true;
    }
    alert('Sorry, you have to login first.');
    this.router.navigate(['/login']);
    return false;
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  //   : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     if (this.userService.ifTokenValid(token)) {
  //       return true;
  //     }
  //   } else {
  //     alert('Please login to view the page.');
  //     localStorage.clear();
  //     this.router.navigateByUrl('/login');
  //     return true;
  //   }
  // }
}
