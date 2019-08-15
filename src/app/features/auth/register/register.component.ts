import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  response: any = null;
  MIN_PSWD_LENGTH = 6;
  MAX_PSWD_LENGTH = 32;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.buildForm();
  }

  ngOnInit() {
    this.response = null;
  }

  register() {
    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) {
      return;
    }
    console.log(this.registerForm.value);
    const formData = this.registerForm.value;
    let requestBodyuserObject = {
      username: formData["username"],
      password: formData["password"]
    }
    this.authService.register(requestBodyuserObject).subscribe(
      responseBody => {
        if (responseBody.result) {
          this.response = {
            message: "You have successfully registered.",
            success: true
          }
        }
        if (responseBody.error) {
          this.response = {
            message: "A user with this email address already exists.",
            success: false
          }
        }
      },
      error => {
        console.log(error);
        this.response = {
          message: "Sorry, something went wrong! Please try again later.",
          success: false
        }
      },
      () => {
      }
    );
  }

  private buildForm() {
    this.registerForm = this.fb.group(
      // default values
      {
        username: ['', [Validators.email, Validators.required]],
        password: ['', [
          Validators.required,
          Validators.minLength(this.MIN_PSWD_LENGTH),
          Validators.maxLength(this.MAX_PSWD_LENGTH)
        ]],
        passwordConfirm: ['', [
          Validators.required,
          Validators.minLength(this.MIN_PSWD_LENGTH),
          Validators.maxLength(this.MAX_PSWD_LENGTH),
        ]]
      }, {validators: passwordConfirm}
    );
  }
}


export const passwordConfirm: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const passwordControl = formGroup.get('password');
  const passwordConfirmControl = formGroup.get('passwordConfirm');
  const isEqual = passwordControl.value.toString().trim() === passwordConfirmControl.value.toString().trim();
  const bothDirty = passwordControl.dirty && passwordConfirmControl.dirty;
  const bothFilled = !(passwordControl.hasError('required') || passwordConfirmControl.hasError('required'));
  return bothDirty && bothFilled && !isEqual ? {password: true, passwordConfirm: true} : null;
};
