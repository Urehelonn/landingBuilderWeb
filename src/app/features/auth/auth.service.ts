import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CanActivate, Router} from "@angular/router";
import {LoginComponent} from "./login/login.component";


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
}
