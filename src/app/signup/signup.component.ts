import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  f = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    repassword: new FormControl('', [Validators.required, this.passwordConfirming.bind(this)])
  });
  response: any;

  constructor(private authService: UserService) {
  }

  ngOnInit() {
  }

  regiSubmit() {
    const user = {username: this.f.value.email, password: this.f.value.password};

    // access user service to login
    this.authService.register(user).subscribe(u => {
      // login success, stores returned string to local as token
      if (u.result) {
        this.response = {
          message: 'register successfully, login your account in login page',
          success: true
        };
        console.log('reg succeed');
      }
      if (u.error) {
        this.response = {
          message: 'register failed, username already exists',
          success: false
        };
        console.log(u.error);
      }
    }, error => {
      console.log(error);
      // 200 as ok, other code as error
      this.response = {
        msg: 'Oops, something went wrong!',
        success: false
      };
    });

    // clear form
    this.f.reset();
  }

  passwordConfirming(control: AbstractControl): { passwordConfirming: boolean } {
    if (this.f) {
      return control.value === this.f.value.password ?
        null : {passwordConfirming: true};
    }
    return null;
  }
}
