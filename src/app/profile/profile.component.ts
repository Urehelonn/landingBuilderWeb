import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordConfirm} from "../register/register.component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    private profileForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.profileForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        }, {validators: passwordConfirm});
    }

    private save() {
        console.log(this.profileForm.value);
    }
}
