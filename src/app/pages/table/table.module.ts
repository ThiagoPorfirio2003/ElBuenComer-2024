import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePageRoutingModule } from './table-routing.module';

import { TablePage } from './table.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { MayusculaPrimeraPipe } from 'src/app/pipe/mayuscula-primera.pipe';
import { EstadoPedidoPipe } from 'src/app/pipe/estado-pedido.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablePageRoutingModule,
    SharedComponentsModule,
    MayusculaPrimeraPipe,
    EstadoPedidoPipe
  ],
  declarations: [TablePage]
})
export class TablePageModule {}
