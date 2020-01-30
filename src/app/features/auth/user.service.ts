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
    if (localStorage.getItem('token')) {
      this.ifTokenValid();
    }
  }

  public login(user: any): Observable<any> {
    // console.log('from service');
    return this.http.post(`http://localhost:8080/api/login`, user);
  }

  public register(user: any): Observable<any> {
    // console.log('from service');
    return this.http.post(`http://localhost:8080/api/register`, user);
  }

  public resendConfirmationEmail(email: string): Observable<any> {
    return this.http.post(`http://localhost:8080/api/confirmation`, email);
  }

  public listenIfLoggedIn(): Observable<boolean> {
    this.setIfLogin();
    return this.isLoggedIn.asObservable();
  }

  public setIfLogin(): void {
    const res = localStorage.getItem('token') !== null;
    console.log(res);
    this.isLoggedIn.next(res);
  }

  private ifTokenValid() {
    const promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/api/me', {headers: this.jwt()}).subscribe(
        result => {
          if (result) {
            resolve();
          }
        }, err => {
          if (err.status === 401 || err.status === 404) {
            reject(Error('Token Invalid'));
          }
          reject(Error('Unknown Error Occured'));
        });
    });

    promise.then(
      // () => {  console.log('token valid'); }
    ).catch(err => {
      console.log(err);
      return this.logOut();
    });
  }

  public changePassword(oldPass: string, newPass: string): Observable<any> {
    const passwords = {
      currentPassword: oldPass,
      newPassword: newPass
    };
    if (localStorage.getItem('token')) {
      return this.http.post(`http://localhost:8080/api/passchange`, passwords, {headers: this.jwt()});
    } else {
      console.log('no valid token found!');
    }
  }

  public logOut() {
    alert('Log Out.');
    // remove all local storage including token
    localStorage.clear();
    this.setIfLogin();

    // after log out return to home page
    this.router.navigateByUrl('/login');
    return false;
  }

  private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', token);
    }
    return null;
  }

}
