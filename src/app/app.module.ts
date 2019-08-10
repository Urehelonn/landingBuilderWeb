import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotComponent } from './features/auth/forgot/forgot.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResetComponent} from './features/auth/reset/reset.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './features/auth/auth.service';
import {HeaderComponent} from './features/header/header.component';
import {FooterComponent} from './features/footer/footer.component';
import {NotFoundComponent} from "./features/others/notfound/not-found.component";
import {HomePageComponent} from './features/home-page/home-page.component';
import {ProfileComponent} from './features/profile/profile.component';
import {EditProfileComponent} from './features/profile/edit-profile/edit-profile.component';
import {AuthGuard} from "./core/guard/auth.guard";
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChangePasswordComponent} from './features/profile/change-password/change-password.component';
import {BuilderComponent} from './features/builder/builder.component';
import {HeadComponent} from './features/builder/head/head.component';
import {GalleryComponent} from './features/builder/gallery/gallery.component';
import {MenuComponent} from './features/builder/menu/menu.component';
import {GalleryEditComponent} from './features/builder/gallery-edit/gallery-edit.component';
import { HeadEditComponent } from './features/builder/head-edit/head-edit.component';
import { MenuEditComponent } from './features/builder/menu-edit/menu-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatSlideToggleModule} from "@angular/material";


const routeConfig: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'builder', component: BuilderComponent},
  {path: '**', component: NotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ForgotComponent,
    ResetComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HomePageComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    BuilderComponent,
    HeadComponent,
    GalleryComponent,
    MenuComponent,
    GalleryEditComponent,
    HeadEditComponent,
    MenuEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routeConfig),
    NgbModule,
    BrowserAnimationsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

