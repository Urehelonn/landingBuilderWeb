import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public login(user: any): Observable<any> {
    console.log('from service');
    return this.http.post(`http://localhost:8080/api/login`, user);
  }

  public register(user: any): Observable<any> {
    console.log('from service');
    return this.http.post(`http://localhost:8080/api/register`, user);
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

  private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', token);
    }
    return null;
  }

}
