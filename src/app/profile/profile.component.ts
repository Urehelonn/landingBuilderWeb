import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  f;

  response = null;

  constructor(private fb: FormBuilder) {
    this.f = this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
        password: [''],
        newpass: ['', [Validators.minLength(5), Validators.maxLength(20)]
        ]
      },
      {validators: this.oldPasswordRequired}
    );
  }

  ngOnInit() {
  }

  profileSubmit() {
    console.log(this.f);
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
