import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentCheckoutPage } from './payment-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentCheckoutPageRoutingModule {}
