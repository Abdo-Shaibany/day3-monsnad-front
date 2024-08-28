import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostViewComponent } from './post-view/post-view.component';

const routes: Routes = [
  {
    path: "",
    component: PostsListComponent
  },
  {
    path: "post-form",
    component: PostFormComponent
  },
  {
    path: "post-form/:id",
    component: PostFormComponent
  },
  {
    path: "post-view/:id",
    component: PostViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsManagerRoutingModule { }
