import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { CameraComponent } from '../components/camera/camera.component';
import { IonicModule } from '@ionic/angular';
import { ChatComponent } from '../components/chat/chat.component';
import { HoraPipe } from '../pipe/hora.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    CameraComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HoraPipe
  ],
  exports:
  [
    HeaderComponent,
    CameraComponent,
    ChatComponent
  ]
})
export class SharedComponentsModule { }
