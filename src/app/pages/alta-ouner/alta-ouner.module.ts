import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaOunerPageRoutingModule } from './alta-ouner-routing.module';

import { AltaOunerPage } from './alta-ouner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaOunerPageRoutingModule
  ],
  declarations: [AltaOunerPage]
})
export class AltaOunerPageModule {}
