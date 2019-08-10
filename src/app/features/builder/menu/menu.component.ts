import {Component, Input, OnInit} from '@angular/core';
import {Categories} from '../../../model/Categories';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menu;
  @Input() categoryData;
  categoryActive: boolean[] = [];
  showAllMenuItem = true;
  menuWithCate: any[] = [];
  currentCate = 0;

  constructor() {
  }

  ngOnInit() {
    //  initialize all menu category to false
    this.categoryData.forEach(() => {
      this.categoryActive.push(false);
    });
    // group items by categories
    this.getMenuOfCate();
  }

  changeActiveMenuWithTag(tag: string) {
    this.showAllMenuItem = false;
    let count = 0;
    this.menuWithCate.forEach(cate => {
      if (tag === cate.cate) {
        this.categoryActive[count] = true;
        this.currentCate = count;
      } else {
        this.categoryActive[count] = false;
      }
      count++;
    });
  }

  showAllMenuItemTrigger() {
    this.showAllMenuItem = true;
    // clear categoryActive
    for (let i = 0; i < this.categoryActive.length; i++) {
      this.categoryActive[i] = false;
    }
  }

  getMenuOfCate() {
    for (let i = 0; i < this.categoryData.length; i++) {
      // console.log(this.categoryData[i]);
      this.menuWithCate.push({
        cate: this.categoryData[i],
        items: []
      });
    }

    if (this.menu !== null) {
      for (let i = 0; i < this.menu.menuItems.length; i++) {
        for (let j = 0; j < this.menuWithCate.length; j++) {
          if (this.menu.menuItems[i].category === this.menuWithCate[j].cate) {
            this.menuWithCate[j].items.push(this.menu.menuItems[i]);
          }
        }
      }
    }
    // console.log(this.menuWithCate);
  }
}
