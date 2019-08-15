import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  //backgroundImg;
  //private sanitizer: DomSanitizer

  @Input() galleryData: any;

  constructor() {
    //this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(this.galleryData.background);

  }

  ngOnInit() {
    console.log(this.galleryData);
  }

}
