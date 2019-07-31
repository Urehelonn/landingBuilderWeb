import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-builder',
    templateUrl: './builder.component.html',
    styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
    builderData = {
        name: 'Tomato',
        logo: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456206/images/nav-logo.png',
        head_sec: {
            title: 'DELICIOUS Food',
            subtitle: 'Tomato is a delicious restaurant website template',
            logo: 'https://res.cloudinary.com/dx55oi3py/image/upload/v1564456206/images/logo.png',
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
        menu_sec: {
            title: 'Our Menu',
            subtitle: 'These fine folks trusted the award winning restaurant.',
            background: '',
            items: {
                starters: [
                    {
                        name: 'English asparagus',
                        price: 14.95,
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95,
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95
                    }
                ],
                breakfast: [
                    {
                        name: 'English asparagus',
                        price: 14.95
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95
                    }
                ],
                lunch: [
                    {
                        name: 'English asparagus',
                        price: 14.95
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95
                    },
                    {
                        name: 'English asparagus',
                        price: 14.95
                    }
                ],
                // dinner: [],
                // desserts: [],
                // drinks: []
            }
        }
    };

    constructor() {
        console.log(this.builderData);
    }

    ngOnInit() {
    }
}
