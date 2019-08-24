import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {error} from 'util';

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
          message: u.result.message,
          success: true
        };
        // store token to local
        localStorage.setItem('token', u.result);
        this.authService.setIfLogin();

        // redirect
        this.router.navigateByUrl('/profile');
      }
      if (u.error) {
        console.log(error);
      }
    }, err => {
      this.response = {
        message: err.error.message,
        success: false
      };
    });

    // clear form
    this.f.reset();
  }
}
