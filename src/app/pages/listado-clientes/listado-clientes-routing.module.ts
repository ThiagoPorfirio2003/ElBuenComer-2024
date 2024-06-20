import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoClientesPage } from './listado-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoClientesPageRoutingModule {}
