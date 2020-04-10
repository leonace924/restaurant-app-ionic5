import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralMenuPageRoutingModule } from './general-menu-routing.module';

import { GeneralMenuPage } from './general-menu.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    GeneralMenuPageRoutingModule
  ],
  declarations: [GeneralMenuPage]
})
export class GeneralMenuPageModule {}
