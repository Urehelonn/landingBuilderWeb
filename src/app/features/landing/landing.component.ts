import {Component, OnDestroy, OnInit} from '@angular/core';
import {BuilderService} from '../builder/builder.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  head: any;
  gallery: any;
  toggleText = 'Edit';
  builderData: any;

  private routeSub: Subscription;
  private builderId;

  constructor(private builderService: BuilderService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.builderId = params.id;
      console.log(this.builderId);
    });

    this.builderService.getById(this.builderId).subscribe(
      data => {
        if (data.result) {
          this.builderData = data.result;
          this.head = data.result.head;
          this.gallery = data.result.gallery;

          // console.log('builderData : ' + JSON.stringify(this.builderData));
          // console.log('Head from server : ' + JSON.stringify(this.head));
          // console.log('Gallery from server : ' + JSON.stringify(this.gallery));
        }
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
