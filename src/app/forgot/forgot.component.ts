import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})

export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.forgotForm = this.fb.group(
        // default values
        {
          username: ['', [Validators.email, Validators.required]],
        }
    );
  }

  forgot() {
    this.forgotForm.markAllAsTouched();
    if (!this.forgotForm.valid) {
      return;
    }
    const formData = this.forgotForm.value;
    this.authService.forgot(formData).subscribe(
        data => {
          // todo: handle login success - server
        },
        error => {
          // todo: handle login failed - server
        }
    );
  }
}
