import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {BuilderComponent} from './builder.component';
import {AuthGuard} from '../../core/guard/auth.guard';

const routes: Routes = [
  {path: '', component: BuilderComponent, canActivate: [AuthGuard]}
];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })

// export class BuilderRouting {
//
// }

export const BuilderRouting: ModuleWithProviders = RouterModule.forChild(routes);
