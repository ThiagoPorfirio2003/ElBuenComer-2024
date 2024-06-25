import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefHomePageRoutingModule } from './chef-home-routing.module';

import { ChefHomePage } from './chef-home.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefHomePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ChefHomePage]
})
export class ChefHomePageModule {}
