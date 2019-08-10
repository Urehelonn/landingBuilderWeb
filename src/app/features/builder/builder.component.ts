import {Component, OnInit} from '@angular/core';
import {BuilderService} from './builder.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  // builderData: any = {
  //   title: 'Tomato',
  //   head: {
  //     title: 'DELICIOUS Food',
  //     subtitle: 'Tomato is a delicious restaurant website template',
  //     img_url: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456206/images/logo.png',
  //     background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564455938/images/bg2.png'
  //   },
  //   gallery_sec: {
  //     title: 'Our features',
  //     subtitle: 'Little things make us best in town',
  //     background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456289/images/bg4.png',
  //     items: [
  //       {
  //         title: 'Serving with love',
  //         background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456524/images/thumb5.png',
  //         description: 'Aenean suscipit vehicula purus quis iaculis. Aliquam nec leo nisi. ' +
  //           'Nam urna arcu, maximus eget ex nec, consequat pellentesque enim. ' +
  //           'Aliquam tempor fringilla odio, vel ullamcorper turpis varius eu.'
  //       },
  //       {
  //         title: 'Serving with love',
  //         background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456524/images/thumb6.png',
  //         description: 'Aenean suscipit vehicula purus quis iaculis. Aliquam nec leo nisi. ' +
  //           'Nam urna arcu, maximus eget ex nec, consequat pellentesque enim. ' +
  //           'Aliquam tempor fringilla odio, vel ullamcorper turpis varius eu.'
  //       },
  //       {
  //         title: 'Serving with love',
  //         background: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456524/images/thumb7.png',
  //         description: 'Aenean suscipit vehicula purus quis iaculis. Aliquam nec leo nisi. ' +
  //           'Nam urna arcu, maximus eget ex nec, consequat pellentesque enim. ' +
  //           'Aliquam tempor fringilla odio, vel ullamcorper turpis varius eu.'
  //       },
  //     ]
  //   },
  //   menuData: {
  //     dynamicMenuTittle: 'Dynamic menu',
  //     dynamicMenuShortDescription: 'These fine folks trusted the award winning restaurant.',
  //     dynamicMenu: [
  //       {
  //         categoryName: 'Desert',
  //         menuItem: [
  //           {
  //             name: 'English Asparagus',
  //             price: 14.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Beoifj Asparagus',
  //             price: 24.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Asparagus English',
  //             price: 4.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //         ]
  //       },
  //
  //       {
  //         categoryName: 'Main Course',
  //         menuItem: [
  //           {
  //             name: 'British Asparagus',
  //             price: 14.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Asparagus Beoifj',
  //             price: 24.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Cmeoafi English',
  //             price: 4.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Cmeoafi English',
  //             price: 4.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Cmeoafi English',
  //             price: 4.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Cmeoafi English',
  //             price: 4.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //         ]
  //       },
  //
  //       {
  //         categoryName: 'Starter',
  //         menuItem: [
  //           {
  //             name: 'Pcideif Beef',
  //             price: 1.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Pcideif Bread',
  //             price: 6.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //           {
  //             name: 'Cpeofk English',
  //             price: 45.99,
  //             description: 'aoifejaoi, awopietj, Aifjae.'
  //           },
  //         ]
  //       }
  //     ]
  //   }
  // };

  builderData: any;

  editModel = false;
  head: any;
  gallery: any;
  toggleText = 'Edit';

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
    if (this.editModel == false) {
      this.toggleText = 'Edit';
    } else {
      this.toggleText = 'Preview';
    }
  }

  saveBuilder() {

  }

  galleryOnSave(galleryData: Section) {
    this.builderData.gallery = galleryData;
    console.log("builderData : " + JSON.stringify(this.builderData));
    this.editModel = !this.editModel;
    // todo: call service update
    this.builderService.editBuilder(this.builderData).subscribe(
      result => {
        console.log("result : " + result)
      });
    alert('You have successfully updated.');
    window.location.reload();
  }




}
