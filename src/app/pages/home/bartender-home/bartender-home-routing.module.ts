import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BartenderHomePage } from './bartender-home.page';

const routes: Routes = [
  {
    path: '',
    component: BartenderHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BartenderHomePageRoutingModule {}
