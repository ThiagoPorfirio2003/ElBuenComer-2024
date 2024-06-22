import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaitreHomePage } from './maitre-home.page';

const routes: Routes = [
  {
    path: '',
    component: MaitreHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaitreHomePageRoutingModule {}
