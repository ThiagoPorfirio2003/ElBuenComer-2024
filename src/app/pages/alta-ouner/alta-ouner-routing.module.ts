import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaOunerPage } from './alta-ouner.page';

const routes: Routes = [
  {
    path: '',
    component: AltaOunerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaOunerPageRoutingModule {}
