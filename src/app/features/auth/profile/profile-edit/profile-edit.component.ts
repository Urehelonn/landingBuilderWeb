import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../services/user.service';
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
        this.form = this.fb.group({
            firstName: [res.result.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
            ],
            lastName: [res.result.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
            ],
            address: [res.result.address, [Validators.minLength(3), Validators.maxLength(40)]],
            phone: [res.result.phone, [Validators.minLength(7), Validators.maxLength(12)]],
            description: [res.result.description, [Validators.maxLength(500)]]
          }
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
    console.log(this.form);
    const user = {
      firstname: this.form.value.firstName,
      lastname: this.form.value.lastName,
      address: this.form.value.address,
      phone: this.form.value.phone,
      description: this.form.value.description
    };
    this.userService.updateUserProfile(user).subscribe(res => {
      if (res.result) {
        console.log('update succeed');
        console.log(res);
        alert('User profile updated!');
        this.router.navigateByUrl('/profile');
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
}
