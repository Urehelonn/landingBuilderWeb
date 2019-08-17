import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  f = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  response: any = null;

  constructor(private authService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  loginSubmit() {
    const user = {username: this.f.value.email, password: this.f.value.password};

    // access user service to login
    this.authService.login(user).subscribe(u => {
      // login success, stores returned string to local as token
      console.log(u);
      if (u.result) {
        this.response = {
          message: 'login successfully!',
          success: true
        };
        console.log('login succeed');
        // store token to local
        localStorage.setItem('token', u.result);
        this.authService.setIfLogin();

        // redirect
        this.router.navigateByUrl('/profile');
      }
      if (u.error) {
        if (u.message === 'user is not active') {
          this.response = {
            message: 'Login failed, please confirm your email associate with the account.',
            success: false
          };
        } else {
          this.response = {
            message: 'Login failed, please check your password again.',
            success: false
          };
        }
      }
    }, error => {
      // no-200 code error handle, such as 401. 403, 404, 500
      // tslint:disable-next-line:triple-equals
      if (error.status == 404 || error.status == 401) {
        this.response = {
          message: 'Pleas confirm your email address. If cannot find the confirmation email, please check junk mail box.',
          success: false
        };
      } else {
        this.response = {
          message: 'Oops, something wrong',
          success: false
        };
      }
    });

    // clear form
    this.f.reset();
  }
}
