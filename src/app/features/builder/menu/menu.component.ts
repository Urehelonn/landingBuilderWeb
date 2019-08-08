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
  menuWithCate: any[] = [];
  currentCate = 0;

  constructor() {
  }

  ngOnInit() {
    // group items by categories
    this.getMenuOfCate();

    //  initialize all menu category to false
    this.menuData.categories.forEach(() => {
      this.categoryActive.push(false);
    });
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
  }

  getMenuOfCate() {
    for (let i = 0; i < this.menuData.categories.length; i++) {
      this.menuWithCate.push({
        cate: this.menuData.categories[i],
        items: []
      });
    }

    for (let i = 0; i < this.menuData.items.length; i++) {
      for (let j = 0; j < this.menuWithCate.length; j++) {
        if (this.menuData.items[i].category === this.menuWithCate[j].cate) {
          this.menuWithCate[j].items.push(this.menuData.items[i]);
        }
      }
    }
    console.log(this.menuWithCate);
  }
}
