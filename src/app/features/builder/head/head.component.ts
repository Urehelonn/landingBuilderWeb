import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  @Input() sectionData: any;

  constructor() {
  }

  ngOnInit() {
    // if(!!this.sectionData.head.background)
  }


  scrollDown() {
    window.scroll({top: innerHeight, behavior: 'smooth'});
  }

}
