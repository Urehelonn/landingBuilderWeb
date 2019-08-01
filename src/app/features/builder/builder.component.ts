import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  builderData = {
    headerData: 'Hi',
    menuData: {
      dynamicMenuTittle: 'Dynamic menu',
      dynamicMenuShortDescription: 'These fine folks trusted the award winning restaurant.',
      dynamicMenu: [
        {
          categoryName: 'Desert',
          menuItem: [
            {
              name: 'English Asparagus',
              price: 14.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Beoifj Asparagus',
              price: 24.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Asparagus English',
              price: 4.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
          ]
        },

        {
          categoryName: 'Main Course',
          menuItem: [
            {
              name: 'British Asparagus',
              price: 14.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Asparagus Beoifj',
              price: 24.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Cmeoafi English',
              price: 4.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Cmeoafi English',
              price: 4.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Cmeoafi English',
              price: 4.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Cmeoafi English',
              price: 4.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
          ]
        },

        {
          categoryName: 'Starter',
          menuItem: [
            {
              name: 'Pcideif Beef',
              price: 1.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Pcideif Bread',
              price: 6.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
            {
              name: 'Cpeofk English',
              price: 45.99,
              description: 'aoifejaoi, awopietj, Aifjae.'
            },
          ]
        }
      ]
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

}
