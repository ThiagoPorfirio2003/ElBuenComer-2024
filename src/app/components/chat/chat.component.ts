import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, input } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumProfile } from 'src/app/enums/profile';
import { chat } from 'src/app/interfaces/chat';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit, OnChanges {

  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild('scrollAnchor', { static: false }) private scrollAnchor!: ElementRef;

  public mensaje: chat = {} as chat;
  @Input() arrayMensajes :Array<any> =  [];

  constructor( public util : UtilsService, private firebase: DataBaseService, private auth: AuthService) 
  { 
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.arrayMensajes.sort((a, b) => this.util.ordenar(a, b));
  }

  ngOnInit() 
  {
    this.mensaje.person = "thiago";
    if(this.auth.isLogued)
    {
      if(this.auth.userData.profile == enumProfile.Waiter)
      {
        this.mensaje.person = this.auth.userData.name;
      }
      else
      {
        this.auth.userData;
        this.firebase.getTableByClientId(this.auth.userData.id).then((array)=>{
          let mesa = array.docs[0].data();
          this.mensaje.person = "mesa-" + mesa["number"];
        })
      }
    }
  }

  public Enviar() 
  {
    let hoy = new Date();
    this.mensaje.fecha = hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear();
    this.mensaje.hora = Date.now();
    this.firebase.saveData(enumCollectionNames.ChatRoom,this.mensaje);
    this.mensaje.content = "";
  }
}
