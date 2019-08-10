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
          console.log(data.result.menu);
        }
      }
    );
  }


  toggleViewModel() {
    this.editModel = !this.editModel;
  }

  // TODO: need somewhere to change the name of builder as well
  galleryOnSave(galleryData: Section) {
    console.log(galleryData);
    this.builderData.gallery_sec = galleryData;
    this.editModel = !this.editModel;
  }

  menuOnSave(menu: Section) {
    this.builderData.menu = menu;
    this.editModel = !this.editModel;
    console.log(this.builderData.menu);
    this.builderService.saveBuilder(this.builderData).subscribe(res => {
      console.log(res);
    });
  }

  constructor(private builderService: BuilderService) {
  }
}
