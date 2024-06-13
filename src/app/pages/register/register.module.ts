import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { RegisterEmployeComponent } from 'src/app/components/register/register-employe/register-employe.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: 
  [
    RegisterPage,
    RegisterEmployeComponent
  ]
})
export class RegisterPageModule {}
