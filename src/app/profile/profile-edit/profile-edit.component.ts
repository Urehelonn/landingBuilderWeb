import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  form;

  response = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    // get initial form value from user data
    this.userService.checkUserProfile().subscribe(res => {
      if (res.result) {
        // this.form.firstName.value = res.result.firstname;
        // this.form.lastName.value = res.result.lastname;
        // this.form.address.value = res.result.address;
        // this.form.phone.value = res.result.phone;
        this.form = this.fb.group({
            firstName: [res.result.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
            ],
            lastName: [res.result.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
            ],
            address: [res.result.address, Validators.minLength(3), Validators.maxLength(40)],
            phone: [res.result.address, Validators.minLength(7), Validators.maxLength(12)],
            password: [''],
            newpass: ['', [Validators.minLength(5), Validators.maxLength(20)]
            ]
          },
          {validators: this.oldPasswordRequired}
        );
      }
      if (res.err) {
        console.log(res.err);
      }

    }, err => {
      if (err.status === 400) {
        alert('Please login!');
        return this.router.navigateByUrl('/login');
      }
      console.log(err);
    });
  }

  profileSubmit() {
    // TODO: old password validation
    console.log(this.form);
    // console.log(this.oldPasswordRequired(this.f));
    const user = {
      firstname: this.form.value.firstName,
      lastname: this.form.value.lastName,
      address: this.form.value.address,
      phone: this.form.value.phone
    };
    this.userService.updateUserProfile(user).subscribe(res => {
      if (res.result) {
        console.log('update succeed');
        console.log(res);
      }
      if (res.err) {
        console.log(res.err);
        alert('update profile failed');
      }
    }, err => {
      if (err) {
        console.log(err);
        alert('update profile failed');
      }
    });
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
