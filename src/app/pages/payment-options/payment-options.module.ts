import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentOptionsPageRoutingModule } from './payment-options-routing.module';

import { PaymentOptionsPage } from './payment-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentOptionsPageRoutingModule
  ],
  declarations: [PaymentOptionsPage]
})
export class PaymentOptionsPageModule {}
