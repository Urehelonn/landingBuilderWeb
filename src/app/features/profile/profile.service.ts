import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private isLoggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
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

  public getBuilderIdByToken(): Observable<any> {
    return this.http.get('http://localhost:8080/api/builderid', {headers: this.jwt()});
  }

  private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', token);
    }
    return null;
  }
}
