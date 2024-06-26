import { Component, OnInit } from '@angular/core';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { orderState } from 'src/app/enums/orderState';
import { order } from 'src/app/interfaces/order';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-chef-home',
  templateUrl: './chef-home.page.html',
  styleUrls: ['./chef-home.page.scss'],
})
export class ChefHomePage {
  public orders: Array<any> = [];
  constructor(private firebase: DataBaseService, private utils: UtilsService) {
    this.firebase
    .getObservable(enumCollectionNames.Orders)
    .subscribe((pedidos) => {
      let pedidosAux: order[] = pedidos as order[];
      this.orders = [];
      pedidosAux.forEach((item) => {
        if (item.state == orderState.InPreparation && !item.kitchenFinished) {
          this.orders.push(item);
        }
      });
      this.utils.SendPushNotification('Nuevo Pedido', `Se ha añadido un nuevo pedido a la lista de espera en preparacion`);
    });
   }

   finalizeOrder(order: order) {
    this.utils
      .showSweet({
        title: 'Finalización de Pedido',
        text:'¿Desea confirmar la finalización del pedido para la mesa ' + order.numberTable.toString() + '?',
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
          order.kitchenFinished == true 
          if(order.kitchenFinished && order.barFinished){
            order.state = orderState.Finished;
          }
          this.firebase.updateData(enumCollectionNames.Orders,order, order.id)
          .then(() => {
            loading.dismiss();
          }).catch((error) => {
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