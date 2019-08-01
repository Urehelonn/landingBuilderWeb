import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menuData;
  categoryActive: boolean[] = [];

  showAllMenuItem = true;

  allItem: any[] = [];

  constructor() {
  }

  ngOnInit() {
    console.log(this.menuData);

    //  initialize all menu category to false
    this.menuData.dynamicMenu.forEach(menu => {
      this.categoryActive.push(false);
    });

    this.getAllItem();
  }

  changeActiveMenuWithTag(tag: string) {
    this.showAllMenuItem = false;
    let count = 0;
    this.menuData.dynamicMenu.forEach(cate => {
      if (tag === cate.categoryName) {
        this.categoryActive[count] = true;
      } else {
        this.categoryActive[count] = false;
      }
      count++;
    });
  }

  showAllMenuItemTrigger() {
    this.showAllMenuItem = true;
  }

  private getAllItem() {
    this.menuData.dynamicMenu.forEach(cate => {
      cate.menuItem.forEach(item => {
        this.allItem.push(item);
      });
    });
  }
}
