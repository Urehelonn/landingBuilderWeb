import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../auth/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  login: boolean;
  subscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.subscription = this.userService.listenIfLoggedIn().subscribe(ifLogin => {
      this.login = ifLogin;
    });
  }

  logout() {
    this.userService.logOut();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
