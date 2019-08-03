import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menuData: any;

  keyArray = [];

  constructor() {
  }

  ngOnInit() {
    for (var key in this.menuData.items) {
      console.log("Key: " + key);
      console.log("Value: " + this.menuData.items[key]);
      this.keyArray.push(key);
      console.log("Array : " + this.keyArray);
    }
  }

  getKey() {
    for (var key in this.menuData.items) {
      this.keyArray.push(key);
      console.log("Array : " + this.keyArray);
      // for (var i=0 ; i<this.menuData.items.length;i++) {
      //   this.keyArray[i] = key[i];
      //   console.log(this.keyArray);
      // }
    }
  }

}
