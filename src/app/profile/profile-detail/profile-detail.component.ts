import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {


    user;

    constructor(private userService: UserService, private router: Router) {

    }


    ngOnInit(): void {
        this.userService.getProfile().subscribe(response => {
                if (response.result) {
                    this.user = {
                        firstName: response.result.firstName,
                        lastName: response.result.lastName,
                        address: response.result.address,
                        description: response.result.description,
                        phone: response.result.phone
                    }
                }
                if (response.error) {

                }

            },
            error => {
                alert("please login first");
                this.router.navigateByUrl("/login");
                // this.router.navigate(['./login']);
            });
    }


}
