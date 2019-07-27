import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

    f;
    user;
    response = null;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

    }

    ngOnInit(): void {
        this.userService.getProfile().subscribe(response => {
                if (response.result) {
                    this.user = {
                        firstName: response.result.firstName,
                        lastName: response.result.lastName,
                        address: response.result.address,
                        description: response.result.description,
                        phone: response.result.phone
                    };
                    this.f = this.fb.group({
                            firstName: [this.user.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
                            ],
                            lastName: [this.user.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
                            ],
                            password: [''],
                            newpass: ['', [Validators.minLength(5), Validators.maxLength(20)]
                            ]
                        },
                        {validators: this.oldPasswordRequired}
                    );
                }
                if (response.error) {

                }

            },
            error => {
                alert("please login first");
                this.router.navigateByUrl("/login");
                // this.router.navigate(['./login']);
            });
    }

    profileSubmit() {
        console.log(this.f);
        const user = this.f.value;
        this.userService.updateUserProfile(user).subscribe(response => {
            if (response.result) {
                alert("update successfully");
            }
            if (response.error) {
                alert("update failed");
            }
        }, error => {
            alert("please login first");
            this.router.navigateByUrl("/login");
        });
        // console.log(this.oldPasswordRequired(this.f));
    }

// only first and last names are required, and if new password field is not empty, password is required as well
    oldPasswordRequired(fg: FormGroup): (ValidationErrors | null) {
        const currPass = fg.get('password');
        const newPass = fg.get('newpass');
        if (newPass.value !== '') {
            if (currPass.value === '') {
                console.log('old pass required');
                return {oldPasswordRequired: true};
            }
        }
        return null;
    }
}
