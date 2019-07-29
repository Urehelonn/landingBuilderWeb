import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginComponent} from "../login/login.component";
import {passwordConfirm} from "../register/register.component";
import {any} from "codelyzer/util/function";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

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
  showProfile: boolean = true;
  showEditProfile: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
              //private socialAuthService: SocialService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
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

  // getProfile() {
  //   if (!this.profileForm.valid) {
  //     return;
  //   }
  //   const formData = this.profileForm.value;
  //   let user = {username: formData['username'], password: formData['password']};
  //   this.authService.login(user).subscribe(
  //     data => {
  //       // todo: handle login success - server
  //       if (data.result) {
  //         localStorage.setItem("token", data.result);
  //         this.returnProfile();
  //         console.log(user);
  //         //localStorage.setItem("token", data.result);
  //       }
  //     },
  //     error => {
  //       // todo: not 200 OK code, such as 401. 403, 404, 500
  //       if (error.status == 404 || error.status == 401) {
  //         this.response = {
  //           message: "Invalid Login. The username/email and password you entered did not match our records.",
  //           success: false
  //         }
  //       } else {
  //         this.response = {
  //           message: "Sorry, something went wrong! Please try again later.",
  //           success: false
  //         }
  //       }
  //
  //     }
  //   );
  //}

  // returnProfile() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('token')
  //     })
  //   };
  //
  //   this.authService.getProfile(httpOptions).subscribe(
  //     data => {
  //       if (data.result) {
  //         this.profileForm.reset();
  //         this.showProfile = !this.showProfile;
  //         this.firstName = data.result.firstName;
  //         this.lastName = data.result.lastName;
  //         this.phone = data.result.phone;
  //         this.address = data.result.address;
  //         this.description = data.result.description;
  //         console.log(data.result);
  //
  //       }
  //     }
  //   );
  // }

  // }
  toggle() {
    //this.profileForm.reset();
    this.response = null;
    this.showProfile = !this.showProfile;
  }

  // edit() {
  //   const formData = this.editProfileForm.value;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('token')
  //     })
  //   };
  //   const profileBody = {
  //     firstName: formData['firstName'],
  //     lastName: formData["lastName"],
  //     phone: formData["phone"],
  //     address: formData["address"],
  //     description: formData["description"],
  //     password: formData["password"]
  //   }
  //
  //   this.authService.editProfile(profileBody).subscribe(
  //     responseBody => {
  //       if (responseBody.result) {
  //         console.log(responseBody.result);
  //         this.response = {
  //           message: "You have successfully updated.",
  //           success: true
  //         }
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //       this.response = {
  //         message: "Sorry, something went wrong! Please try again later.",
  //         success: false
  //       }
  //     },
  //     () => {
  //     }
  //   );

  back() {
    //this.router.navigateByUrl('/getProfile');
    this.showEditProfile = !this.showEditProfile;
    this.showProfile = !this.showProfile;
    //this.editProfileForm.reset();
    //this.profileForm.reset();

  }

  private buildForm() {
    // this.profileForm = this.fb.group(
    //   // default values
    //   {
    //     username: ['', [Validators.email, Validators.required]],
    //     password: ['', [
    //       Validators.required
    //     ]]
    //   }
    // );

    // this.editProfileForm = this.fb.group({
    //   firstName: [this.profileForm.value['firstName'], Validators.required],
    //   lastName: [this.profileForm.value['lastName'], Validators.required],
    //   phone: [this.profileForm.value['phone'], Validators.required],
    //   address: [this.profileForm.value['address'], Validators.required],
    //   description: [this.profileForm.value['description'], Validators.required],
    //   password: ['', [
    //     Validators.required,
    //     Validators.minLength(this.MIN_PSWD_LENGTH)
    //   ]],
    //   passwordConfirm: ['', [
    //     Validators.required,
    //     Validators.minLength(this.MIN_PSWD_LENGTH)
    //   ]],
    // }, {validators: passwordConfirm});
  }


}
