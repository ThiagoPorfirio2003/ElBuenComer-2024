import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoClientesPageRoutingModule } from './listado-clientes-routing.module';

import { ListadoClientesPage } from './listado-clientes.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { MayusculaPrimeraPipe } from 'src/app/pipe/mayuscula-primera.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoClientesPageRoutingModule,
    SharedComponentsModule,
    MayusculaPrimeraPipe
  ],
  declarations: [ListadoClientesPage]
})
export class ListadoClientesPageModule {}
