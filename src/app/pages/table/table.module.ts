import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePageRoutingModule } from './table-routing.module';

import { TablePage } from './table.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { AltaEncuestaComponent } from 'src/app/components/alta-encuesta/alta-encuesta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [TablePage, AltaEncuestaComponent]
})
export class TablePageModule {}
