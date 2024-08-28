import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsManagerRoutingModule } from './posts-manager-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PostsListComponent, PostViewComponent, PostFormComponent],
  imports: [
    CommonModule,
    PostsManagerRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class PostsManagerModule { }
