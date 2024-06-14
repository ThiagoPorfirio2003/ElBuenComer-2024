import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterEmployePageRoutingModule } from './register-employe-routing.module';

import { RegisterEmployePage } from './register-employe.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterEmployePageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [RegisterEmployePage]
})
export class RegisterEmployePageModule {}
