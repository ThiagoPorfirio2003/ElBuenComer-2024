import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableListModalComponent } from 'src/app/components/table-list-modal/table-list-modal.component';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { client } from 'src/app/interfaces/user';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-maitre-home',
  templateUrl: './maitre-home.page.html',
  styleUrls: ['./maitre-home.page.scss'],
})
export class MaitreHomePage implements OnInit {
  
  public clientes : Array<any> = [];
  public mesasDisponibles : Array<any> = [];

  constructor( private modalController: ModalController, private utiles: UtilsService, private firebase: DataBaseService ) {
    this.firebase.getObservable(enumCollectionNames.WaitingRoom).subscribe((clientes)=>{
        this.clientes = clientes;
        const mensaje = `Se ha añadido un nuevo cliente a la lista de espera para asignación de mesa`;
        this.utiles.SendPushNotification("Nuevo Cliente Asignado", mensaje);
    })
    this.firebase.getObservable(enumCollectionNames.Tables).subscribe((tables)=>{
        this.mesasDisponibles = [];
        tables.forEach((item)=>{
          if(item["idCurrentClient"] == "" && item["state"] == 0) {
            this.mesasDisponibles.push(item);
          }});
        });
    }

  ngOnInit() {}

  async openModal(client: any) {
    if (this.mesasDisponibles.length > 0) {
      const modal = await this.modalController.create({
        component: TableListModalComponent,
        componentProps: { tables: this.mesasDisponibles, client },
      });
      return await modal.present();
    } else {
        let mensaje = this.utiles.translateAuthError("MND");
        this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"warning"});
    }
  }
}
