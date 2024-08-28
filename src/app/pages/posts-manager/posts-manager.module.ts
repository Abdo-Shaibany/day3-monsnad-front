import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsManagerRoutingModule } from './posts-manager-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [PostsListComponent, PostViewComponent, PostFormComponent],
  imports: [
    CommonModule,
    PostsManagerRoutingModule,
    ComponentsModule
  ]
})
export class PostsManagerModule { }
