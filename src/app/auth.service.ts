import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CanActivate, Router} from "@angular/router";
import {LoginComponent} from "./features/auth/login/login.component";


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, public router: Router) {

  }

  public login(user: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/login`, user);
  }

  public register(user: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/register`, user);
  }

  public forgot(email: string): Observable<any> {
    return this.http.post(`http://localhost:8080/api/forgot`, email);
  }

  public reset(user: User): Observable<any> {
    return this.http.post(`http://localhost:8080/api/reset`, user);
  }

  public getProfile(): Observable<any> {
    return this.http.get('http://localhost:8080/api/me', {headers: this.jwt()});
  }

  public editProfile(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/me', user, {headers: this.jwt()});
  }

  // register token header
  private jwt() {
    // register authorization header with jwt token
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }
  }
}
