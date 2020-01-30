import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfileService} from '../profile.service';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  MIN_PSWD_LENGTH = 6;
  MAX_PSWD_LENGTH = 32;
  changePassword: FormGroup;
  isMatch: boolean = false;
  response: any = null;


  constructor(private fb: FormBuilder, private profileService: ProfileService, private authService: AuthService, private router: Router) {
    this.buildForm();
  }

  ngOnInit() {
    this.response = null;
  }

  save() {
    const formData = this.changePassword.value;
    let user = {
      username: localStorage.getItem('user'),
      password: formData["currentPassword"]
    };
    this.authService.login(user).subscribe(
      data => {
        if (data.result) {
          this.isMatch = true;
          if (this.isMatch == true) {
            //const formData = this.changePassword.value;
            let newPassword = {
              password: this.changePassword.value['confirmNew']
            }
            this.profileService.editProfile(newPassword).subscribe(
              response => {
                if (response.result) {
                  console.log(response.result);
                  console.log(response.message);
                  alert("You have successfully updated.");
                  this.router.navigateByUrl('/profile');
                  // this.response = {
                  //   message: "You have successfully updated.",
                  //   success: true
                  // }
                }
              },
              error => {
                console.log(error);
                this.response = {
                  message: "Sorry, something went wrong! Please try again later.",
                  success: false
                }
              }
            );

          }
        }
      },
      error => {
        if (error.status == 404 || error.status == 401) {
          this.response = {
            message: "Current password you entered did not match our records.",
            success: false
          }
        }
      }
    );


  }

  private buildForm() {
    this.changePassword = this.fb.group(
      // default values
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [
          Validators.required,
          Validators.minLength(this.MIN_PSWD_LENGTH),
          Validators.maxLength(this.MAX_PSWD_LENGTH)
        ]],
        confirmNew: ['', [
          Validators.required,
          Validators.minLength(this.MIN_PSWD_LENGTH),
          Validators.maxLength(this.MAX_PSWD_LENGTH),
        ]]
      }, {validators: passwordConfirm}
    );
  }


}

export const passwordConfirm: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const passwordControl = formGroup.get('newPassword');
  const passwordConfirmControl = formGroup.get('confirmNew');
  const isEqual = passwordControl.value.toString().trim() === passwordConfirmControl.value.toString().trim();
  const bothDirty = passwordControl.dirty && passwordConfirmControl.dirty;
  const bothFilled = !(passwordControl.hasError('required') || passwordConfirmControl.hasError('required'));
  return bothDirty && bothFilled && !isEqual ? {password: true, passwordConfirm: true} : null;
};
