import {Component, OnInit} from '@angular/core';
import {BuilderService} from './builder.service';
import {UserService} from '../auth/user.service';
import {Router} from '@angular/router';

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

  constructor(private builderService: BuilderService, private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.builderService.getMine().subscribe(
      data => {
        if (data.result) {
          this.builderData = data.result;
          this.builderId = data.result.id * 1;

        } else if (data.message === 'corresponding builder not found') {
          this.editModel = true;
          this.builderData = {
            name: '',
            head: {},
            gallery: {},
            menu: {}
          };
          console.log(this.builderData);
        }
      }, err => {
        console.log(err);
        if (err.status === 401) {
          alert('User invalid, please login to view the page.');
          this.userService.logOut();
        }
        alert('Oops, something went wrong!');
        this.router.navigateByUrl('/notfound');
      }
    );
  }

  toggleViewModel() {
    this.editModel = !this.editModel;
    this.toggleText = this.editModel ? 'Preview' : 'Edit';
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

  ifHeadShow(): boolean {
    if (this.builderData.head && this.builderData.head.title
      && this.builderData.head.description
      && this.builderData.head.imgUrl) {
      return true;
    }
    // console.log(this.builderData.head);
    return false;
  }

  ifGalleryShow(): boolean {
    if (this.builderData.gallery && this.builderData.gallery.title
      && this.builderData.gallery.description
      && this.builderData.gallery.background) {
      return true;
    }
    // console.log(this.builderData.gallery);
    return false;
  }

  ifMenuShow(): boolean {
    if (this.builderData.menu && this.builderData.menu.title
      && this.builderData.menu.description) {
      return true;
    }
    // console.log(this.builderData.menu);
    return false;
  }
}
