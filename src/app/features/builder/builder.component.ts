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
        } else if (data.message === 'corresponding builder not found') {
          this.builderData = {
            "name": "test updated",
            "head": {
              "imgUrl": "https://via.placeholder.com/150",
              "description": "head desc updated",
              "title": "head title updted"
            },
            "gallery": {
              "title": "g title updated",
              "description": "g desc",
              "galleryItems": [{"id":2,"title":"sdf","description":"sdf","imgUrl":"https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/content9442.jpg","modifiedAt":"2019-08-23T00:40:59.000+0000"}]
            },
            "menu": {

              "title": "menu title",
              "description": "menu desc",

              "menuItems": [
                {
                  "category": "breakfast",
                  "name": "mi1 update",
                  "description": "menu item 1 desc",
                  "price": "101"
                },
                {

                  "category": "breakfast",
                  "name": "mi2 update",
                  "description": "menu item 2 desc",
                  "price": "51"
                },
                {

                  "category": "dinner",
                  "name": "mi3",
                  "description": "menu item 3 desc",
                  "price": "31"
                },
                {
                  "category": "lunch",
                  "name": "mi4",
                  "description": "menu item 4 desc",
                  "price": '41'
                }
              ]
            }
          };
        }
      }, err => {
        console.log(err);
        if (err.status === 401) {
          //alert('User invalid, please login to view the page.');
        }
        //this.userService.logOut();
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
