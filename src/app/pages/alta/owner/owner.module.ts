import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerPageRoutingModule } from './owner-routing.module';

import { OwnerPage } from './owner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OwnerPageRoutingModule
  ],
  declarations: [OwnerPage]
})
export class OwnerPageModule {}
