import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  user;

  constructor(private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    // get initial form value from user data
    this.profileService.checkUserProfile().subscribe(res => {
      if (res.result) {
        this.user = {
          firstName: res.result.firstname,
          lastName: res.result.lastname,
          address: res.result.address,
          phone: res.result.phone,
          description: res.result.description
        };
      }
      if (res.err) {
        console.log(res.err);
      }

    }, err => {
      if (err.status === 400) {
        alert('Please login!');
        return this.router.navigateByUrl('/login');
      }
      alert('Oops! Something went wrong.');
      return this.router.navigateByUrl('/notfound');
    });
  }


}
