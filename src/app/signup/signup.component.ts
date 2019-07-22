import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
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

  constructor() {
  }

  ngOnInit() {
  }

  regiSubmit() {
    console.log(this.f.value);
    // clear form
    this.f.reset();
  }

  passwordConfirming(control: AbstractControl): { passwordConfirming: boolean } {
    if (this.f) {
      return control.value === this.f.value.password ?
        null : {passwordConfirming: true};
    }
    // console.log(this.f.controls(password).value);
    return null;
  }

}
