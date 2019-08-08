import {Component, Input, OnInit} from '@angular/core';
import {Categories} from '../../../model/Categories';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menuData: Section;
  categoryActive: boolean[] = [];
  showAllMenuItem = true;
  menuWithCate: any[]=[];

  constructor() {
  }

  ngOnInit() {
    console.log(this.menuData);
    // group items by categories
    this.getMenuOfCate();

    //  initialize all menu category to false
    this.menuData.categories.forEach(() => {
      this.categoryActive.push(false);
    });
  }

  changeActiveMenuWithTag(tag: string) {
    // this.showAllMenuItem = false;
    // let count = 0;
    // this.menuData.dynamicMenu.forEach(cate => {
    //   if (tag === cate.categoryName) {
    //     this.categoryActive[count] = true;
    //   } else {
    //     this.categoryActive[count] = false;
    //   }
    //   count++;
    // });
  }

  showAllMenuItemTrigger() {
    this.showAllMenuItem = true;
  }

  getMenuOfCate() {
    for (let i = 0; i < this.menuData.categories.length; i++) {
      this.menuWithCate.push({
        cate: this.menuData.categories[i],
        menus: []
      });
    }

    for (let i = 0; i < this.menuData.items.length; i++) {
      for (let j = 0; j < this.menuWithCate.length; j++) {
        if (this.menuData.items[i].categories === this.menuWithCate[j].cate) {
          this.menuWithCate[j].menus.push(this.menuData.items[i]);
        }
      }
    }
    console.log(this.menuWithCate);
  }
}
