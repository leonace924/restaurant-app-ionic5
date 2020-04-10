import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentOptionsPage } from './payment-options.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentOptionsPageRoutingModule {}
