import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoPageRoutingModule } from './no-page-routing.module';
import { NoPageComponent } from './no-page/no-page.component';


@NgModule({
  declarations: [NoPageComponent],
  imports: [
    CommonModule,
    NoPageRoutingModule
  ]
})
export class NoPageModule { }
