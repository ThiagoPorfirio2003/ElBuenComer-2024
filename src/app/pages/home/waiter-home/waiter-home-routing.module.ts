import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaiterHomePage } from './waiter-home.page';

const routes: Routes = [
  {
    path: '',
    component: WaiterHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiterHomePageRoutingModule {}
