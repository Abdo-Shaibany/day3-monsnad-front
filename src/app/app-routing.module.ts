import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "posts",
    pathMatch: "full",
  },
  {
    path: "posts",
    loadChildren: () =>
      import('./pages/posts-manager/posts-manager.module').then(
        (m) => m.PostsManagerModule
      ),
    canActivate: [authGuard]
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
