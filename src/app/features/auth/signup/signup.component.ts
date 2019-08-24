import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';


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

  constructor(private authService: UserService, private router: Router) {
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
          message: u.result.message,
          success: true
        };
        alert('User register complete, please check your email box and confirm your email address to active user account.');
        // redirect after register succeed
        this.router.navigate(['login']);
      }
      if (u.error) {
        this.response = {
          message: u.error.message,
          success: false
        };
      }
    }, error => {
      console.log(error);
      this.response = {
        msg: error.error.message,
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
