import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  constructor(private http: HttpClient, public router: Router) {
  }

  public getMine(): Observable<any> {
    return this.http.get('http://localhost:8080/api/me/build', {headers: this.jwt()});
  }

  public saveBuilder(builder: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/me/build', builder, {headers: this.jwt()});
  }

  public getById(id: any): Observable<any> {
    return this.http.get('http://localhost:8080/api/build/' + id);
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
