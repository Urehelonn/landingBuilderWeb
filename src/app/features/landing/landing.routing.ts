import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {LandingComponent} from './landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent}
];

export const LandingRouting: ModuleWithProviders = RouterModule.forChild(routes);
