import {Component, OnInit} from '@angular/core';
import {BuilderService} from './builder.service';
import {UserService} from '../auth/user.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  editModel = false;
  toggleText = 'Edit';
  builderData: any;
  builderId: number;

  constructor(private builderService: BuilderService, private userService: UserService) {
  }

  ngOnInit() {
    this.builderService.getMine().subscribe(
      data => {
        if (data.result) {
          this.builderData = data.result;
          this.builderId = data.result.id * 1;
          // console.log(data.result.id);
          // this.head = data.result.head;
          // this.gallery = data.result.gallery;

          // console.log('builderData : ' + JSON.stringify(this.builderData));
          // console.log('Head from server : ' + JSON.stringify(this.head));
          // console.log('Gallery from server : ' + JSON.stringify(this.gallery));
        }
      }, err => {
        console.log(err);
        if (err.status === 401) {
          alert('User invalid, please login to view the page.');
        }
        this.userService.logOut();
      }
    );
  }


  toggleViewModel() {
    this.editModel = !this.editModel;
    this.toggleText = this.editModel ? 'Preview' : 'Edit';
  }

  // doesn't have function to save head, menu, gallery all at once yet
  saveBuilder() {

  }

  headOnSave(head) {
    this.builderData.head = head;
    this.editModel = !this.editModel;
    // console.log(head);
    // console.log(this.builderData.head);
    this.builderService.editBuilder(this.builderData).subscribe(res => {
      // console.log(this.builderData.head);
      // console.log(res);
    });
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
    console.log(this.builderData);
    this.editModel = !this.editModel;
    this.builderService.editBuilder(this.builderData).subscribe(
      result => {
        if (result.result) {
          console.log(result);
        }
      });

  }


}
