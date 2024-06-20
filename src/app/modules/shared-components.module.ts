import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { CameraComponent } from '../components/camera/camera.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    HeaderComponent,
    CameraComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:
  [
    HeaderComponent,
    CameraComponent
  ]
})
export class SharedComponentsModule { }
