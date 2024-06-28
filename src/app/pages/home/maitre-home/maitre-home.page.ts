import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TableListModalComponent } from 'src/app/components/table-list-modal/table-list-modal.component';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-maitre-home',
  templateUrl: './maitre-home.page.html',
  styleUrls: ['./maitre-home.page.scss'],
})
export class MaitreHomePage implements OnInit, OnDestroy {
  public clientes: Array<any> = [];
  public mesasDisponibles: Array<any> = [];
  private subscripcion: Subscription;
  private flag: Boolean = false;
  private cantidad: number = 0;

  constructor(
    private modalController: ModalController,
    private utiles: UtilsService,
    private firebase: DataBaseService
  ) {
    this.subscripcion = this.firebase
      .getObservable(enumCollectionNames.WaitingRoom)
      .subscribe((data) => {
        this.clientes = [];
        this.clientes = data;

        if (this.flag) {
          if (this.clientes.length > this.cantidad) {
            this.utiles.SendPushNotification(
              'Nuevo Cliente Asignado',
              'Se ha añadido un nuevo cliente a la lista de espera para asignación de mesa'
            );
          }
        } else {
          this.flag = true;
        }
        this.cantidad = this.clientes.length;
      });

    this.firebase
      .getObservable(enumCollectionNames.Tables)
      .subscribe((tables) => {
        this.mesasDisponibles = [];
        tables.forEach((item) => {
          if (item['idCurrentClient'] == '' && item['state'] == 0) {
            this.mesasDisponibles.push(item);
          }
        });
      });
  }

  ngOnInit() {
    LocalNotifications.checkPermissions().then((permiso) => {
      if (permiso.display != 'granted') {
        this.utiles.showSweet({
          title: 'Permisos',
          text: 'Activa los permisos de las notificaciones',
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  async openModal(client: any) {
    if (this.mesasDisponibles.length > 0) {
      const modal = await this.modalController.create({
        component: TableListModalComponent,
        componentProps: { tables: this.mesasDisponibles, client },
      });
      return await modal.present();
    } else {
      let mensaje = this.utiles.translateAuthError('MND');
      this.utiles.showSweet({
        titleText: mensaje.title,
        text: mensaje.content,
        icon: 'warning',
      });
    }
  }
}
