import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  f = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    repassword: new FormControl('', [Validators.required, this.passwordConfirming])
  });

  constructor() { }

  ngOnInit() {
    console.log(this.f);
  }

  regiSubmit() {
    console.log(this.f.value);
    // clear form
    this.f.reset();
  }

  passwordConfirming(control: AbstractControl): { invalid: boolean } {
    return control.value === this.f.get('repassword') ?
      {invalid: true} : {invalid: true};
  }

}
