import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {passwordConfirm} from '../register/register.component';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
    resetForm: FormGroup;

    MIN_PSWD_LENGTH = 6;
    MAX_PSWD_LENGTH = 32;

    constructor(private fb: FormBuilder,
                private authService: AuthService) {
        this.buildForm();
    }

    ngOnInit() {
    }

    private buildForm() {
        this.resetForm = this.fb.group(
            // default values
            {
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

    reset() {
        this.resetForm.markAllAsTouched();
        if (!this.resetForm.valid) {
            return;
        }
        const formData = this.resetForm.value;
        this.authService.reset(formData).subscribe(
            data => {
                // todo: handle login success - server
            },
            error => {
                // todo: handle login failed - server
            },
            () => {
            }
        );
    }
}
