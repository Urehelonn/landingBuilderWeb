import {Component, OnInit} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  MIN_PSWD_LENGTH = 6;
  editProfileForm: FormGroup;
  response = null;
  firstName: String;
  lastName: String;
  phone: String;
  address: String;
  description: String;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
          console.log(data.result);

          // this.editProfileForm = this.fb.group({
          //   firstName: [this.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
          //   lastName: [this.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
          //   phone: [this.phone, [Validators.required]],
          //   address: [this.address, [Validators.required]],
          //   description: [this.description, [Validators.required]],
          //   password: [''],
          //   confirmPassword: ['', [Validators.minLength(5), Validators.maxLength(20)]]
          // });
        }
      });
  }

  save() {
    console.log(this.editProfileForm);
    const formData = this.editProfileForm.value;
    this.authService.editProfile(formData).subscribe(
      response => {
        if (response.result) {
          console.log(response.result);
          alert("You have successfully updated.");
          this.router.navigateByUrl('/profile');
          this.response = {
            message: "You have successfully updated.",
            success: true
          }
        }
      },
      error => {
        console.log(error);
        this.response = {
          message: "Sorry, something went wrong! Please try again later.",
          success: false
        }
      }
    );
  }

  private buildForm() {
    this.editProfileForm = this.fb.group({
      firstName: [this.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: [this.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      phone: [this.phone, [Validators.required]],
      address: [this.address, [Validators.required]],
      description: [this.description, [Validators.required]]
      // password: [''],
      // confirmPassword: ['', [Validators.minLength(5), Validators.maxLength(20)]]
    });
  }


}
