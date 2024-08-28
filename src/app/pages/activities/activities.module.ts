import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';


@NgModule({
  declarations: [ActivityListComponent],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    LayoutsModule
  ]
})
export class ActivitiesModule { }
