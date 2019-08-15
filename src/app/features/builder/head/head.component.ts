import {Component, Input, OnInit} from '@angular/core';
import {last} from "rxjs/operators";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  //let preloader = document.getElementById("loading");

  @Input() sectionData: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.sectionData);
  }


  scrollDown() {
    window.scroll({top: innerHeight, behavior: "smooth"});
  }

}
