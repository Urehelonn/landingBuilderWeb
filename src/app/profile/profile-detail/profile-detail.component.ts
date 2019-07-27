import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  user;

  constructor(private userService: UserService, private router: Router) {
    this.user = {
      firstName: 'joe',
      lastName: 'doe',
      address: '923 Mareef Street, ON',
      description: 'aeifuh aeiuaer adkvuher acae as casoerijfb addf earg chtjh cxpovkr.',
      phone: '632-555-XXXX'
    };
  }

  ngOnInit() {
    // get initial form value from user data
    this.userService.checkUserProfile().subscribe(res => {
      if (res.result) {
        this.user = {
          firstName: res.result.firstname,
          lastName: res.result.lastname,
          address: res.result.address,
          phone: res.result.phone
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
      console.log(err);
    });
  }

}
