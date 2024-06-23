import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { CameraComponent } from '../components/camera/camera.component';
import { IonicModule } from '@ionic/angular';
import { TableListModalComponent } from '../components/table-list-modal/table-list-modal.component';
import { EnumtypePipe } from '../pipe/enumtype.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    CameraComponent,
    TableListModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    EnumtypePipe
  ],
  exports:
  [
    HeaderComponent,
    CameraComponent,
    TableListModalComponent
  ]
})
export class SharedComponentsModule { }
