import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

}
