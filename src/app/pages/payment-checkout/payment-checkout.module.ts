import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCheckoutPageRoutingModule } from './payment-checkout-routing.module';

import { PaymentCheckoutPage } from './payment-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentCheckoutPageRoutingModule
  ],
  declarations: [PaymentCheckoutPage]
})
export class PaymentCheckoutPageModule {}
