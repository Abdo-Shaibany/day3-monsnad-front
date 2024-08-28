import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SuppliersListComponent, SupplierFormComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class SuppliersModule {}
