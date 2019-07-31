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

    public getProfile(): Observable<any> {
        console.log('angular service called to update user profile');
        return this.http.get(`http://localhost:8080/api/me`,
            {headers: this.jwt()}
        );

    }

    public updateUserProfile(user: any): Observable<any> {
        console.log('angular service called to update user profile');
        return this.http.post(`http://localhost:8080/api/me`, user, {headers: this.jwt()});
    }


    // register token header
    private jwt() {
        // register authorization header with jwt token
        const token = localStorage.getItem('token');
        if (token) {
            // let headers = new Headers({ 'Authorization': token });
            // return new RequestOptions({ headers: headers });
            return new HttpHeaders().set('Authorization', 'Bearer ' + token);
        }
    }


}
