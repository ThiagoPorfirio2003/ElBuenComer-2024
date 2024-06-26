import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefHomePage } from './chef-home.page';

const routes: Routes = [
  {
    path: '',
    component: ChefHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefHomePageRoutingModule {}
