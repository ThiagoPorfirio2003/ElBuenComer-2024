import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterHomePageRoutingModule } from './waiter-home-routing.module';

import { WaiterHomePage } from './waiter-home.page';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { HoraPipe } from 'src/app/pipe/hora.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterHomePageRoutingModule,
    HoraPipe
  ],
  declarations: [WaiterHomePage, ChatComponent]
})
export class WaiterHomePageModule {}
