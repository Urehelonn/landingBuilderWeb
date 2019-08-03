import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, public router: Router) { }

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
