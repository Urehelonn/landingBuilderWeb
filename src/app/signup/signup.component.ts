import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  f = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required])
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

}
