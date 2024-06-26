import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiningMenuPage } from './dining-menu.page';

const routes: Routes = [
  {
    path: '',
    component: DiningMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiningMenuPageRoutingModule {}
