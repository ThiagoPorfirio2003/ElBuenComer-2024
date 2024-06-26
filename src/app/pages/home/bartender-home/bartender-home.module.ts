import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BartenderHomePageRoutingModule } from './bartender-home-routing.module';

import { BartenderHomePage } from './bartender-home.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { MayusculaPrimeraPipe } from 'src/app/pipe/mayuscula-primera.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BartenderHomePageRoutingModule,
    SharedComponentsModule,
    MayusculaPrimeraPipe
  ],
  declarations: [BartenderHomePage]
})
export class BartenderHomePageModule {}
