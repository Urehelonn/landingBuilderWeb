import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ForgotComponent} from './forgot/forgot.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from "./auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ResetComponent} from './reset/reset.component';
import {ProfileComponent} from './profile/profile.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./notfound/not-found.component";
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

const routeConfig: Routes = [
    {path: '', component: AppComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: LoginComponent},
    {path: 'reset', component: ResetComponent},
    {path: 'profile', component: ProfileComponent},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ForgotComponent,
        RegisterComponent,
        ResetComponent,
        ProfileComponent,
        HeaderComponent,
        FooterComponent,
        NotFoundComponent,
        ProgressBarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routeConfig)
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
