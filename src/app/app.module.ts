import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {SignupComponent} from './features/auth/signup/signup.component';
import {UserService} from './features/auth/user.service';
import {LoginComponent} from './features/auth/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {ProfileEditComponent} from './features/profile/profile-edit/profile-edit.component';
import {NavComponent} from './features/nav/nav.component';
import {FooterComponent} from './features/footer/footer.component';
import {NotFoundComponent} from './features/others/not-found/not-found.component';
import {ProcessBarComponent} from './features/others/process-bar/process-bar.component';
import {HomeComponent} from './features/home/home.component';
import {ProfileDetailComponent} from './features/profile/profile-detail/profile-detail.component';
import {AuthGuard} from "./core/auth.guard";
import { BuilderComponent } from './features/builder/builder.component';
import { HeadComponent } from './features/builder/head/head.component';
import { GalleryComponent } from './features/builder/gallery/gallery.component';
import { MenuComponent } from './features/builder/menu/menu.component';


// routes value
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileDetailComponent, canActivate: [AuthGuard]},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileEditComponent},
    {path: 'builder', component: BuilderComponent},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        ProfileEditComponent,
        NavComponent,
        FooterComponent,
        NotFoundComponent,
        ProcessBarComponent,
        HomeComponent,
        ProfileDetailComponent,
        BuilderComponent,
        HeadComponent,
        GalleryComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes,
            // { enableTracing: true } // <-- debugging purposes only
        ),
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
