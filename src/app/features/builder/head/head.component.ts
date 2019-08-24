import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  @Input() sectionData: any;
  backgroundSet: string;

  constructor() {
  }

  ngOnInit() {
    this.backgroundSet = !!this.sectionData.background ?
      this.sectionData.background : '../../../../assets/images/builder/header-bg.png';
    // console.log(this.backgroundSet);
  }


  scrollDown() {
    window.scroll({top: innerHeight, behavior: 'smooth'});
  }

}
