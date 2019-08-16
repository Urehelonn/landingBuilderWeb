import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  editProfileForm: FormGroup;

  MIN_PSWD_LENGTH = 6;
  MAX_PSWD_LENGTH = 32;
  response: any = null;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  description: string;
  landingUrl: string;


  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private router: Router
  ) {

  }

  ngOnInit(): void {
    this.landingUrl = 'Current user have no landding page.';
    this.profileService.getProfile().subscribe(
      data => {
        if (data.result) {
          this.firstName = data.result.firstName;
          this.lastName = data.result.lastName;
          this.phone = data.result.phone;
          this.address = data.result.address;
          this.description = data.result.description;
          // console.log(data.result);
        }
      }
    );

    this.profileService.getBuilderIdByToken().subscribe(data => {
      if (data.result) {
        this.landingUrl = 'http://localhost:4200/landing/' + data.result;
      }
    });
  }

  editProfile() {
    // this.showEditProfile = !this.showEditProfile;
    console.log('Edit profile.');
    this.router.navigateByUrl('/profile/edit');
  }


}
