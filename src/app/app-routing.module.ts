import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScaffoldOneComponent } from './layouts/scaffold-one/scaffold-one.component';
import { adminGuard } from './core/guards/admin.guard';
import { userGuard } from './core/guards/user.guard';

// TODO: add 404 page :)
const routes: Routes = [
  // TODO: this should be home page later
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: 'home',
    component: ScaffoldOneComponent,
    children: [
      {
        path: 'admin/users',
        loadChildren: () =>
          import('./pages/suppliers/suppliers.module').then(
            (m) => m.SuppliersModule
          ),
        canActivate: [adminGuard]
      },
      {
        path: 'admin/activities',
        loadChildren: () =>
          import('./pages/activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),
        canActivate: [adminGuard]
      },
      {
        path: 'admin/profile',
        loadChildren: () =>
          import('./pages/suppliers/suppliers.module').then(
            (m) => m.SuppliersModule
          ),
        canActivate: [userGuard]
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/no-page/no-page.module').then((m) => m.NoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
