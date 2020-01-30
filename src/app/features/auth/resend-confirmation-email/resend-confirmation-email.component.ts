import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {error} from 'util';

@Component({
  selector: 'app-resend-confirmation-email',
  templateUrl: './resend-confirmation-email.component.html',
  styleUrls: ['./resend-confirmation-email.component.scss']
})
export class ResendConfirmationEmailComponent implements OnInit {

  emailResendForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  response: any = null;
  countDown = 0;
  interval: any;

  constructor(private authService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    const email = this.emailResendForm.value.email;
    this.countDown = 60;
    // access user service to login
    this.authService.resendConfirmationEmail(email).subscribe(u => {
      // login success, stores returned string to local as token
      console.log(u);
      if (u.result) {
        this.response = {
          message: u.result.message,
          success: true
        };

        // redirect
        this.router.navigateByUrl('/login');
      }
    }, err => {
      this.response = {
        message: err.error.message,
        success: false
      };
    });
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.countDown--;
    }, 1000);
  }
}
