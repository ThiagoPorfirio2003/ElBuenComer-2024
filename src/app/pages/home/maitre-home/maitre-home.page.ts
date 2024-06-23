import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableListModalComponent } from 'src/app/components/table-list-modal/table-list-modal.component';
import { enumClientState } from 'src/app/enums/clientState';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumProfile } from 'src/app/enums/profile';
import { enumTypeTable } from 'src/app/enums/tableType';
import { Table } from 'src/app/interfaces/table';
import { baseUserData, client } from 'src/app/interfaces/user';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-maitre-home',
  templateUrl: './maitre-home.page.html',
  styleUrls: ['./maitre-home.page.scss'],
})
export class MaitreHomePage implements OnInit {
  /** para que la propiedad is es gratis */
  listMesas: Table[] = [
    {
      number: 1,
      type: enumTypeTable.VIP,
      peopleQuantity: 4,
      isFree: true,
      idCurrentClient: '',
    },
    {
      number: 2,
      type: enumTypeTable.Standar,
      peopleQuantity: 2,
      isFree: false,
      idCurrentClient: '',
    },
    {
      number: 3,
      type: enumTypeTable.Special,
      peopleQuantity: 6,
      isFree: true,
      idCurrentClient: '',
    },
    {
      number: 4,
      type: enumTypeTable.Standar,
      peopleQuantity: 4,
      isFree: false,
      idCurrentClient: '',
    },
    {
      number: 5,
      type: enumTypeTable.VIP,
      peopleQuantity: 2,
      isFree: true,
      idCurrentClient: '',
    },
    {
      number: 6,
      type: enumTypeTable.Special,
      peopleQuantity: 8,
      isFree: false,
      idCurrentClient: '',
    },
    {
      number: 7,
      type: enumTypeTable.Standar,
      peopleQuantity: 4,
      isFree: true,
      idCurrentClient: '',
    },
    {
      number: 8,
      type: enumTypeTable.Special,
      peopleQuantity: 5,
      isFree: false,
      idCurrentClient: '',
    },
  ];

  public clientes : Array<any> = [];
  public mesasDisponibles : Array<any> = [];
  constructor( private modalController: ModalController, private utiles: UtilsService, private firebase: DataBaseService ) {
    this.firebase.getObservable(enumCollectionNames.Clients).subscribe((clientes)=>{
        this.clientes = clientes;
        const mensaje = `Se ha añadido un nuevo cliente a la lista de espera para asignación de mesa`;
        this.utiles.SendPushNotification("Nuevo Cliente Asignado", mensaje);
    })
    this.firebase.getObservable(enumCollectionNames.Tables).subscribe((tables)=>{
        this.mesasDisponibles = [];
        tables.forEach((item)=>{
          if(item["idCurrentClient"] == "") {
            this.mesasDisponibles.push(item);
          }});
        });
    }

  ngOnInit() {}

  async openModal(client: client) {
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
