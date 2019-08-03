import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthGuard} from "../../auth.guard";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, private authGuard: AuthGuard) {
    this.router.events.subscribe((event) => {
      console.log(event);
    });
  }

  ngOnInit() {


  }


  logout() {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigateByUrl("/");
    }

  }

  loggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false;
    }
  }

  change() {
    this.router.navigateByUrl('/changepassword');
  }

}
