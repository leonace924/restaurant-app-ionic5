import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrdersPage } from './create-orders.page';

const routes: Routes = [
  {
    path: '',
    component: CreateOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOrdersPageRoutingModule {}
