import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaitreHomePageRoutingModule } from './maitre-home-routing.module';

import { MaitreHomePage } from './maitre-home.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { EnumtypePipe } from 'src/app/pipe/enumtype.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaitreHomePageRoutingModule,
    SharedComponentsModule,
    EnumtypePipe
  ],
  declarations: [MaitreHomePage]
})
export class MaitreHomePageModule {}
