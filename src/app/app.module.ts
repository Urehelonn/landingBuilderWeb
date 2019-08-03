import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotComponent } from './forgot/forgot.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResetComponent} from './reset/reset.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import {HeaderComponent} from './features/header/header.component';
import {FooterComponent} from './features/footer/footer.component';
import {NotFoundComponent} from "./features/others/notfound/not-found.component";
import {HomePageComponent} from './features/home-page/home-page.component';
import {ProfileComponent} from './features/profile/profile.component';
import {EditProfileComponent} from './features/edit-profile/edit-profile.component';
import {AuthGuard} from "./auth.guard";
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChangePasswordComponent} from './features/change-password/change-password.component';
import {BuilderComponent} from './features/builder/builder.component';
import {HeadComponent} from './features/builder/head/head.component';
import {GalleryComponent} from './features/builder/gallery/gallery.component';
import {MenuComponent} from './features/builder/menu/menu.component';

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
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routeConfig),
    NgbModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

