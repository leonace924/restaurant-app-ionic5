import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionRestaurantPageRoutingModule } from './option-restaurant-routing.module';

import { OptionRestaurantPage } from './option-restaurant.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    OptionRestaurantPageRoutingModule
  ],
  declarations: [OptionRestaurantPage]
})
export class OptionRestaurantPageModule {}
