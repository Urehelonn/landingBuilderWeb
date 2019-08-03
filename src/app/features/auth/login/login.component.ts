import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../auth.service';
import {Router} from "@angular/router";
import {ProfileComponent} from "../../profile/profile.component";
// import {
//     SocialService
// } from "ngx-social-button";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  MIN_PSWD_LENGTH = 6;
  MAX_PSWD_LENGTH = 32;
  response: any = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              //private socialAuthService: SocialService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.response = null;
  }

  getSocialUser(socialUser) {
    console.log(socialUser);
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
      return;
    }
    const formData = this.loginForm.value;
    let user = {username: formData['username'], password: formData['password']};
    this.authService.login(user).subscribe(
      data => {
        // todo: handle login success - server
        if (data.result) {
          this.response = {
            message: "Login successfully.",
            success: true
          }
          localStorage.setItem('user', user.username);
          localStorage.setItem("token", data.result);
          this.router.navigateByUrl('/');
        }
      },
      error => {
        // todo: not 200 OK code, such as 401. 403, 404, 500
        if (error.status == 404 || error.status == 401) {
          this.response = {
            message: "Invalid Login. The username/email and password you entered did not match our records.",
            success: false
          }
        } else {
          this.response = {
            message: "Sorry, something went wrong! Please try again later.",
            success: false
          }
        }

      }
    );
  }

  private buildForm() {
    this.loginForm = this.fb.group(
      // default values
      {
        username: ['', [Validators.email, Validators.required]],
        password: ['', [
          Validators.required
        ]],
        rememberMe: false
      }
    );
  }


}


