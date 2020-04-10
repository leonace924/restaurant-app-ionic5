import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderConfirmationPage } from './order-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: OrderConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderConfirmationPageRoutingModule {}
