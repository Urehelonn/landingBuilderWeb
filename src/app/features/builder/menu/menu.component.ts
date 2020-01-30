import {Component, Input, OnInit} from '@angular/core';

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
    console.log(this.menu.menuItems);
    for (const mn of this.menu.menuItems) {
      // if category doesn't exist, push new category with empty item list
      if (!this.categoryData.includes(mn.category)) {
        this.categoryData.push(mn.category);
        this.menuWithCate.push({
          cate: mn.category,
          menuItems: []
        });
      }
      // if category exist, push item to menuWithCate of that category
      for (const mnWithCate of this.menuWithCate) {
        if (mn.category === mnWithCate.cate) {
          mnWithCate.menuItems.push(mn);
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
