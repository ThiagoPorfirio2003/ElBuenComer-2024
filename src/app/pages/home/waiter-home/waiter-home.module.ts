import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterHomePageRoutingModule } from './waiter-home-routing.module';

import { WaiterHomePage } from './waiter-home.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { EstadoPedidoPipe } from 'src/app/pipe/estado-pedido.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterHomePageRoutingModule,
    SharedComponentsModule,
    EstadoPedidoPipe
  ],
  declarations: [WaiterHomePage]
})
export class WaiterHomePageModule {}
