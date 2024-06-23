import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterHomePageRoutingModule } from './waiter-home-routing.module';

import { WaiterHomePage } from './waiter-home.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterHomePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [WaiterHomePage]
})
export class WaiterHomePageModule {}
