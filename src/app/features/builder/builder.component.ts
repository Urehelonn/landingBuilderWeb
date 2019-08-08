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
  builderData: any = {
    title: 'Tomato',
    head: {
      title: 'DELICIOUS Food',
      subtitle: 'Tomato is a delicious restaurant website template',
      img_url: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456206/images/logo.png',
      background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564455938/images/bg2.png'
    },
    gallery_sec: {
      title: 'Our features',
      subtitle: 'Little things make us best in town',
      background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456289/images/bg4.png',
      items: [
        {
          title: 'Serving with love',
          background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456524/images/thumb5.png',
          description: 'Aenean suscipit vehicula purus quis iaculis. Aliquam nec leo nisi. ' +
            'Nam urna arcu, maximus eget ex nec, consequat pellentesque enim. ' +
            'Aliquam tempor fringilla odio, vel ullamcorper turpis varius eu.'
        },
        {
          title: 'Serving with love',
          background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456524/images/thumb6.png',
          description: 'Aenean suscipit vehicula purus quis iaculis. Aliquam nec leo nisi. ' +
            'Nam urna arcu, maximus eget ex nec, consequat pellentesque enim. ' +
            'Aliquam tempor fringilla odio, vel ullamcorper turpis varius eu.'
        },
        {
          title: 'Serving with love',
          background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456524/images/thumb7.png',
          description: 'Aenean suscipit vehicula purus quis iaculis. Aliquam nec leo nisi. ' +
            'Nam urna arcu, maximus eget ex nec, consequat pellentesque enim. ' +
            'Aliquam tempor fringilla odio, vel ullamcorper turpis varius eu.'
        },
      ]
    },
    menuData: {
      title: 'Asfoei Brepfoke',
      categories: [Categories.starter, Categories.main_course, Categories.dessert, Categories.breakfast],
      description: 'These fine folks trusted the award winning restaurant. vorigh',
      items: [
        {
          category: Categories.breakfast,
          title: 'Breakfast Broccolli',
          description: 'PAOwdpiorfj  aoiefjasoeidf aoief joaidf oaiwefj',
          price: 27.99
        },
        {
          category: Categories.dessert,
          title: 'Dessert Broccolli',
          description: 'PAOwdpiorfj  aoiefjasoeidf aoief joaidf oaiwefj',
          price: 27.99
        },
        {
          category: Categories.dessert,
          title: 'Dessert Broccolli2',
          description: 'PAOwdpiorfj  aoiefjasoeidf aoief joaidf oaiwefj',
          price: 27.99
        },
        {
          category: Categories.main_course,
          title: 'Main Broccolli',
          description: 'PAOwdpiorfj  aoiefjasoeidf aoief joaidf oaiwefj',
          price: 2.99
        },
        {
          category: Categories.starter,
          title: 'Starter Broccolli',
          description: 'PAOwdpiorfj  aoiefjasoeidf aoief joaidf oaiwefj',
          price: 2.99
        }
      ]
    }
  };

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

  menuOnSave(menuDate: Section) {
    console.log(menuDate);
    this.builderData.menuData = menuDate;
    this.editModel = !this.editModel;
    // todo: call service update
  }

  ngOnInit() {
    this.builderService.getMine().subscribe(
      data => {
        if (data.result) {
          console.log('Head from server : ' + data.result.head);
        }
      }
    );
  }

  constructor(private builderService: BuilderService) {
  }
}
