import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralMenuPageRoutingModule } from './general-menu-routing.module';

import { GeneralMenuPage } from './general-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralMenuPageRoutingModule
  ],
  declarations: [GeneralMenuPage]
})
export class GeneralMenuPageModule {}
