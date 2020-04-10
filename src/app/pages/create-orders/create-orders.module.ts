import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateOrdersPageRoutingModule } from './create-orders-routing.module';

import { CreateOrdersPage } from './create-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOrdersPageRoutingModule
  ],
  declarations: [CreateOrdersPage]
})
export class CreateOrdersPageModule {}
