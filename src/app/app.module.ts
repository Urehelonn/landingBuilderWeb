// ==================================== ANGULAR LIBRARIES =======================================
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatSlideToggleModule} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// =================================== COMPONENTS =============================================
import {ForgotComponent} from './features/auth/forgot/forgot.component';
import {ResetComponent} from './features/auth/reset/reset.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {FooterComponent} from './features/footer/footer.component';
import {BuilderComponent} from './features/builder/builder.component';
import {HeadComponent} from './features/builder/head/head.component';
import {GalleryComponent} from './features/builder/gallery/gallery.component';
import {MenuComponent} from './features/builder/menu/menu.component';
import {GalleryEditComponent} from './features/builder/gallery-edit/gallery-edit.component';
import {HeadEditComponent} from './features/builder/head-edit/head-edit.component';
import {MenuEditComponent} from './features/builder/menu-edit/menu-edit.component';
import {LandingComponent} from './features/landing/landing.component';
import {NavComponent} from './features/nav/nav.component';
import {ChangePasswordComponent} from './features/auth/change-password/change-password.component';
import {ProfileEditComponent} from './features/profile/profile-edit/profile-edit.component';
import {ProfileDetailComponent} from './features/profile/profile-detail/profile-detail.component';
import {HomeComponent} from './features/home/home.component';

// ======================================== GUARDS ==========================================
import {AuthGuard} from './core/guard/auth.guard';

// =================================== CUSTOM MODULES =========================================
import {UserService} from './features/auth/user.service';
import {NotFoundComponent} from './features/others/notfound/not-found.component';


const routeConfig: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'profile', component: ProfileDetailComponent, canActivate: [AuthGuard]},
  {path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'builder', component: BuilderComponent, canActivate: [AuthGuard]},
  {path: 'landing/:id', component: LandingComponent},
  {path: '**', component: NotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ForgotComponent,
    ResetComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NotFoundComponent,
    ProfileDetailComponent,
    ProfileEditComponent,
    ChangePasswordComponent,
    BuilderComponent,
    HeadComponent,
    GalleryComponent,
    MenuComponent,
    GalleryEditComponent,
    HeadEditComponent,
    MenuEditComponent,
    LandingComponent,
    NavComponent,
    HomeComponent,
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
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

