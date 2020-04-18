import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCheckoutPageRoutingModule } from './payment-checkout-routing.module';

import { PaymentCheckoutPage } from './payment-checkout.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    PaymentCheckoutPageRoutingModule
  ],
  declarations: [PaymentCheckoutPage]
})
export class PaymentCheckoutPageModule {}
