import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaitreHomePageRoutingModule } from './maitre-home-routing.module';

import { MaitreHomePage } from './maitre-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaitreHomePageRoutingModule
  ],
  declarations: [MaitreHomePage]
})
export class MaitreHomePageModule {}
