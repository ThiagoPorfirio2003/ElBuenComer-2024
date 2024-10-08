import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { CameraComponent } from '../components/camera/camera.component';
import { IonicModule } from '@ionic/angular';
import { ChatComponent } from '../components/chat/chat.component';
import { HoraPipe } from '../pipe/hora.pipe';
import { FormsModule } from '@angular/forms';
import { TableListModalComponent } from '../components/table-list-modal/table-list-modal.component';
import { EnumtypePipe } from '../pipe/enumtype.pipe';
import { MayusculaPrimeraPipe } from '../pipe/mayuscula-primera.pipe';
import { BoughtProductsListComponent } from '../components/bought-products-list/bought-products-list.component';
import { AltaEncuestaComponent } from '../components/alta-encuesta/alta-encuesta.component';
import { GraphicCommentsComponent } from '../components/graphic-comments/graphic-comments.component';
import { GraphicComponent } from '../components/graphic/graphic.component';
import { EstadoPedidoPipe } from '../pipe/estado-pedido.pipe';
import { ChatModalComponent } from '../components/modals/chat-modal/chat-modal.component';
@NgModule({
  declarations: [
    HeaderComponent,
    CameraComponent,
    ChatComponent,
    TableListModalComponent,
    BoughtProductsListComponent,
    AltaEncuestaComponent,
    GraphicCommentsComponent,
    GraphicComponent,
    ChatModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HoraPipe,
    EnumtypePipe,
    MayusculaPrimeraPipe,
    EstadoPedidoPipe
  ],
  exports:
  [
    HeaderComponent,
    CameraComponent,
    ChatComponent,
    TableListModalComponent,
    BoughtProductsListComponent,
    AltaEncuestaComponent,
    GraphicCommentsComponent,
    GraphicComponent,
    ChatModalComponent
  ]
})
export class SharedComponentsModule { }
