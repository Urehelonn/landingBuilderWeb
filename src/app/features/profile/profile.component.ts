import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
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
  firstName: String;
  lastName: String;
  phone: String;
  address: String;
  description: String;


  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private router: Router
              //private socialAuthService: SocialService
  ) {

  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      data => {
        if (data.result) {
          this.firstName = data.result.firstName;
          this.lastName = data.result.lastName;
          this.phone = data.result.phone;
          this.address = data.result.address;
          this.description = data.result.description;
          //console.log(data.result);

        }
      }
    );
  }

  editProfile() {
    //this.showEditProfile = !this.showEditProfile;
    console.log("Edit clicked");
    this.router.navigateByUrl('/profile/edit');
  }





}
