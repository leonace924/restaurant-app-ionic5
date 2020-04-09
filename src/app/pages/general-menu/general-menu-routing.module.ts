import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralMenuPage } from './general-menu.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralMenuPageRoutingModule {}
