import {Component, Input, OnInit} from '@angular/core';
import {Categories} from '../../../model/Categories';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menu;
  categoryData: string[] = [];
  categoryActive: boolean[] = [];
  showAllMenuItem = true;
  menuWithCate: any[] = [];
  currentCate = 0;

  constructor() {
  }

  ngOnInit() {
    // group items by categories
    this.getCategories();
    //  initialize all menu category to false
    this.categoryData.forEach(() => {
      this.categoryActive.push(false);
    });
  }

  getCategories() {
    for (let i = 0; i < this.menu.menuItems.length; i++) {
      // if category doesn't exist, push new category with empty item list
      if (!this.categoryData.includes(this.menu.menuItems[i].category)) {
        this.categoryData.push(this.menu.menuItems[i].category);
        this.menuWithCate.push({
          cate: this.categoryData[i],
          menuItems: []
        });
        // if category exist, push item to menuWithCate of that category
        for (let j = 0; j < this.menuWithCate.length; j++) {
          if (this.menu.menuItems[i].category === this.menuWithCate[j].cate) {
            this.menuWithCate[j].menuItems.push(this.menu.menuItems[i]);
          }
        }
      }
    }
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
}
