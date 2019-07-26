import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  user;

  constructor(private userService: UserService) {
    this.user = {
      firstname: 'joe',
      lastname: 'doe',
      address: '923 Mareef Street, ON',
      description: 'aeifuh aeiuaer adkvuher acae as casoerijfb addf earg chtjh cxpovkr.',
      phone: '632-555-XXXX'
    };
  }

  ngOnInit() {
  }

}
