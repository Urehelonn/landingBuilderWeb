import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {UserService} from './services/user.service';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProcessBarComponent} from './process-bar/process-bar.component';
import {HomeComponent} from './home/home.component';
import {ProfileDetailComponent} from './profile/profile-detail/profile-detail.component';
import {AuthGuard} from "./core/auth.guard";


// routes value
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileDetailComponent, canActivate: [AuthGuard]},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileEditComponent},
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
