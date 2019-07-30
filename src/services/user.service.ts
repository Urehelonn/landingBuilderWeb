import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
  }

  public login(user: any): Observable<any> {
    console.log('from service');
    return this.http.post(`http://localhost:8080/api/login`, user);
  }

  public register(user: any): Observable<any> {
    console.log('from service');
    return this.http.post(`http://localhost:8080/api/register`, user);
  }

  public listenIfLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public setIfLogin(): void {
    const res = localStorage.getItem('token') !== null;
    console.log(res);
    this.isLoggedIn.next(res);
  }

  public checkUserProfile(): Observable<any> {
    console.log('angular service called to update user profile');
    if (localStorage.getItem('token')) {
      return this.http.get(`http://localhost:8080/api/me`, {headers: this.jwt()});
    } else {
      console.log('no valid token found!');
    }
  }

  public updateUserProfile(user: any): Observable<any> {
    console.log('angular service called to update user profile');
    if (localStorage.getItem('token')) {
      return this.http.post(`http://localhost:8080/api/me`, user, {headers: this.jwt()});
    } else {
      console.log('no valid token found!');
    }
  }

  public logOut() {
    alert('Log Out');
    // remove all local storage including token
    localStorage.clear();
    this.setIfLogin();

    // after log out return to home page
    this.router.navigateByUrl('/login');
  }

  private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', token);
    }
    return null;
  }

}
