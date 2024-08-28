import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainSideMenuComponent } from './main-side-menu/main-side-menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingSkeletonComponent } from './loading-skeleton/loading-skeleton.component';
import { ProgressComponent } from './progress/progress.component';
import { InputTextComponent } from './input-text/input-text.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StepsComponent } from './steps/steps.component';
import { MessageComponent } from './message/message.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { InputTextIconComponent } from './input-text-icon/input-text-icon.component';
import { AddNewOneComponent } from './add-new-one/add-new-one.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TagComponent } from './tag/tag.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    TopBarComponent,
    MainSideMenuComponent,
    SearchComponent,
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    LoadingSkeletonComponent,
    ProgressComponent,
    InputTextComponent,
    BreadcrumbComponent,
    StepsComponent,
    MessageComponent,
    ConfirmComponent,
    InputTextIconComponent,
    AddNewOneComponent,
    TextareaComponent,
    TagComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CKEditorModule,
  ],
  exports: [
    TopBarComponent,
    MainSideMenuComponent,
    SearchComponent,
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    LoadingSkeletonComponent,
    ProgressComponent,
    InputTextComponent,
    BreadcrumbComponent,
    StepsComponent,
    MessageComponent,
    ConfirmComponent,
    InputTextIconComponent,
    AddNewOneComponent,
    TextareaComponent,
    TagComponent,
  ],
  providers: [provideNgxMask()],
})
export class ComponentsModule { }
