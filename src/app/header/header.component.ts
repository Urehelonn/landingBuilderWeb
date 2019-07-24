import {Component, OnInit} from '@angular/core';
import {
    ActivatedRoute,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private showProgress = false;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.showProgress = true;
            }

            if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                setTimeout(() => {
                    this.showProgress = false;
                }, 1500);
            }
        });
    }

    ngOnInit() {

    }

}
