import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoClientesPageRoutingModule } from './listado-clientes-routing.module';

import { ListadoClientesPage } from './listado-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoClientesPageRoutingModule
  ],
  declarations: [ListadoClientesPage]
})
export class ListadoClientesPageModule {}
