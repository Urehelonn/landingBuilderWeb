import {Component, OnInit} from '@angular/core';
import {BuilderService} from './builder.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  editModel = false;
  head: any;
  gallery: any;
  toggleText = 'Edit';
  builderData: any;

  constructor(private builderService: BuilderService) {
  }

  ngOnInit() {
    this.builderService.getMine().subscribe(
      data => {
        if (data.result) {
          this.builderData = data.result;
          this.head = data.result.head;
          this.gallery = data.result.gallery;

          console.log("builderData : " + JSON.stringify(this.builderData));
          console.log("Head from server : " + JSON.stringify(this.head));
          console.log("Gallery from server : " + JSON.stringify(this.gallery));
        }
      }
    );
  }


  toggleViewModel() {
    this.editModel = !this.editModel;
    this.toggleText = this.editModel ? 'Preview' : 'Edit';
  }

  saveBuilder() {

  }


  menuOnSave(menu: Section) {
    this.builderData.menu = menu;
    this.editModel = !this.editModel;
    this.builderService.editBuilder(this.builderData).subscribe(res => {
      console.log(res);
    });
  }

  galleryOnSave(galleryData: Section) {
    this.builderData.gallery = galleryData;
    console.log("builderData : " + JSON.stringify(this.builderData));
    this.editModel = !this.editModel;
    // todo: call service update
    this.builderService.editBuilder(this.builderData).subscribe(
      result => {
        if (result.result) {
          console.log("result : " + JSON.stringify(result));
          alert('You have successfully updated.');
          window.location.reload();
        }
      });

  }


}
