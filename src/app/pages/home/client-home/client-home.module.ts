import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientHomePageRoutingModule } from './client-home-routing.module';

import { ClientHomePage } from './client-home.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { AltaEncuestaComponent } from 'src/app/components/alta-encuesta/alta-encuesta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientHomePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ClientHomePage]
})
export class ClientHomePageModule {}
