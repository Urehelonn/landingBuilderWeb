import {Component, OnInit} from '@angular/core';
import {BuilderService} from './builder.service';
import {Categories} from '../../model/Categories';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  editModel = false;
  builderData: any;
  categoryData: any = [Categories.dinner, Categories.lunch, Categories.breakfast];

  ngOnInit() {
    this.builderService.getMine().subscribe(
      data => {
        if (data.result) {
          this.builderData = data.result;
        }
      }
    );
  }


  toggleViewModel() {
    this.editModel = !this.editModel;
  }

  saveBuilder() {

  }

  galleryOnSave(galleryData: Section) {
    console.log(galleryData);
    this.builderData.gallery_sec = galleryData;
    this.editModel = !this.editModel;
    // todo: call service update
  }

  menuOnSave(menu: Section) {
    console.log(menu);
    this.builderData.menuData = menu;
    this.editModel = !this.editModel;
    // todo: call service update
  }


  constructor(private builderService: BuilderService) {
  }
}
