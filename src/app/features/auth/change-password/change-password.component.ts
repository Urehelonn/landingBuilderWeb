import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  response = false;
  form = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required, this.passwordConfirming.bind(this)])
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  changePassword() {
    this.userService.changePassword(this.form.value.oldPass, this.form.value.newPass).subscribe(res => {
      if (res.result) {
        console.log('Password changed.');
        alert('Password changed, automatically logout.');
        this.userService.logOut();
      }
      if (res.err) {
        console.log(res.err);
        this.response = true;
      }
    }, err => {
      console.log(err);
    });
  }

  passwordConfirming(control: AbstractControl): { passwordConfirming: boolean } {
    if (this.form) {
      return control.value === this.form.value.newPass ?
        null : {passwordConfirming: true};
    }
    return null;
  }
}
