import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule, MatInputModule, MatSlideToggleModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingRouting} from './landing.routing';
import {MenuComponent} from '../builder/menu/menu.component';
import {HeadComponent} from '../builder/head/head.component';
import {GalleryComponent} from '../builder/gallery/gallery.component';
import {LandingComponent} from './landing.component';

@NgModule({
  declarations: [
    LandingComponent,
    MenuComponent,
    HeadComponent,
    GalleryComponent,
  ],
  imports: [
    LandingRouting,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LandingComponent,
    MenuComponent,
    HeadComponent,
    GalleryComponent,
  ]
})

export class LandingModule {}
