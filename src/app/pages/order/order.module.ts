import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { EstadoPedidoPipe } from 'src/app/pipe/estado-pedido.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    SharedComponentsModule,
    EstadoPedidoPipe
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
