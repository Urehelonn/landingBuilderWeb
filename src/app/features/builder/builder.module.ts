import {NgModule} from '@angular/core';
import {BuilderComponent} from './builder.component';
import {GalleryEditComponent} from './gallery-edit/gallery-edit.component';
import {BuilderRouting} from './builder.routing';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule, MatInputModule, MatSlideToggleModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuComponent} from './menu/menu.component';
import {HeadComponent} from './head/head.component';
import {GalleryComponent} from './gallery/gallery.component';
import {MenuEditComponent} from './menu-edit/menu-edit.component';
import {HeadEditComponent} from './head-edit/head-edit.component';


@NgModule({
  declarations: [
    BuilderComponent,

    MenuComponent,
    HeadComponent,
    GalleryComponent,

    MenuEditComponent,
    HeadEditComponent,
    GalleryEditComponent
  ],
  imports: [
    BuilderRouting,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    BuilderComponent,

    MenuComponent,
    HeadComponent,
    GalleryComponent,

    MenuEditComponent,
    HeadEditComponent,
    GalleryEditComponent
  ]
})

export class BuilderModule {}
