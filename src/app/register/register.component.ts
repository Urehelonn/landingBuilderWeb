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
        // setTimeout(()=>{
        //     this.response = {
        //         message: "register successfully, login you account in login page",
        //         success: false
        //     }
        // }, 2000)
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
                // todo: handle login success - server
                if (responseBody.result) {
                    this.response = {
                        message: "register successfully, login you account in login page",
                        success: true
                    }
                }
                if (responseBody.error) {
                    this.response = {
                        message: "register failed, username already exists",
                        success: false
                    }
                }
            },
            error => {
                // todo: not 200 OK code, such as 401. 403, 404, 500
                console.log(error);
                this.response = {
                    message: "Oops, something wrong",
                    success: false
                }
            },
            () => {
            }
        );
    }
}

/** A hero's name can't match the hero's alter ego */
export const passwordConfirm: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    const passwordControl = formGroup.get('password');
    const passwordConfirmControl = formGroup.get('passwordConfirm');
    const isEqual = passwordControl.value.toString().trim() === passwordConfirmControl.value.toString().trim();
    const bothTouched = passwordControl.touched && passwordConfirmControl.touched;
    const bothFilled = !(passwordControl.hasError('required') || passwordConfirmControl.hasError('required'));
    return bothTouched && bothFilled && !isEqual ? {password: true, passwordConfirm: true} : null;
};
