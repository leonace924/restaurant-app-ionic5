import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderConfirmationPageRoutingModule } from './order-confirmation-routing.module';

import { OrderConfirmationPage } from './order-confirmation.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    OrderConfirmationPageRoutingModule
  ],
  declarations: [OrderConfirmationPage]
})
export class OrderConfirmationPageModule {}
