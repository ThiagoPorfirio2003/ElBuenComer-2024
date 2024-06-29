import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { orderState } from 'src/app/enums/orderState';
import { order } from 'src/app/interfaces/order';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-bartender-home',
  templateUrl: './bartender-home.page.html',
  styleUrls: ['./bartender-home.page.scss'],
})
export class BartenderHomePage implements OnInit, OnDestroy {
  public orders: Array<any> = [];
  private flag: Boolean = false;
  private cantidad: number = 0;
  private subscripcion: Subscription;

  constructor(private firebase: DataBaseService, private utils: UtilsService) {
    this.subscripcion = this.firebase
      .getObservable(enumCollectionNames.Orders)
      .subscribe((pedidos) => {
        let pedidosAux: order[] = pedidos as order[];
        this.orders = [];

        pedidosAux.forEach((item) => {
          if (item.state == orderState.InPreparation && !item.barFinished) {
            this.orders.push(item);
          }
        });

        if (this.flag) {
          if (this.orders.length > this.cantidad) {
            this.utils.SendPushNotification(
              'Nuevo Pedido',
              'Se ha añadido un nuevo pedido a la lista de espera en preparacion'
            );
          }
        } else {
          this.flag = true;
        }
        this.cantidad = this.orders.length;
      });
  }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  ngOnInit() {
    LocalNotifications.checkPermissions().then((permiso) => {
      if (permiso.display != 'granted') {
        this.utils.showSweet({
          title: 'Permisos',
          text: 'Activa los permisos de las notificaciones',
        });
      }
    });
  }

  finalizeOrder(order: order) {
    this.utils
      .showSweet({
        title: 'Finalización de Pedido',
        text:
          '¿Desea confirmar la finalización del pedido para la mesa ' +
          order.numberTable.toString() +
          '?',
        showCancelButton: true,
        cancelButtonText: 'No, aún no está listo',
        confirmButtonText: 'Sí, finalizar pedido',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const loading = await this.utils.getLoadingCtrl({
            spinner: 'circular',
          });
          await loading.present();
          order.barFinished = true;
          if (order.kitchenFinished && order.barFinished) {
            order.state = orderState.Finished;
          }
          this.firebase
            .updateData(enumCollectionNames.Orders, order, order.id)
            .then(() => {
              loading.dismiss();
            })
            .catch((error) => {
              let mensaje = this.utils.translateAuthError(error.code);
              this.utils.showSweet({
                titleText: mensaje.title,
                text: mensaje.content,
                icon: 'error',
              });
            });
        }
      });
  }
}
