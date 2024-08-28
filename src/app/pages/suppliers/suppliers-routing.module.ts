import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'suppliers-list',
    pathMatch: 'full',
  },
  {
    path: 'suppliers-list',
    component: SuppliersListComponent,
  },
  {
    path: 'supplier-form',
    component: SupplierFormComponent,
  },
  {
    path: 'supplier-form/:id',
    component: SupplierFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuppliersRoutingModule {}
