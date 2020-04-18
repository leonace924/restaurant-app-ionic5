import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentOptionsPageRoutingModule } from './payment-options-routing.module';

import { PaymentOptionsPage } from './payment-options.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    PaymentOptionsPageRoutingModule
  ],
  declarations: [PaymentOptionsPage]
})
export class PaymentOptionsPageModule {}
