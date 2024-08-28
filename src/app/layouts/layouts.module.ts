import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutTwoComponent } from './layout-two/layout-two.component';
import { ComponentsModule } from '../components/components.module';
import { LayoutOneComponent } from './layout-one/layout-one.component';
import { ScaffoldOneComponent } from './scaffold-one/scaffold-one.component';
import { RouterModule } from '@angular/router';
import { LayoutThreeComponent } from './layout-three/layout-three.component';

@NgModule({
  declarations: [
    LayoutTwoComponent,
    LayoutOneComponent,
    ScaffoldOneComponent,
    LayoutThreeComponent
  ],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [
    LayoutTwoComponent,
    LayoutOneComponent,
    LayoutThreeComponent
  ],
})
export class LayoutsModule { }
