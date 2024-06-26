import { Component } from '@angular/core';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { orderState } from 'src/app/enums/orderState';
import { order } from 'src/app/interfaces/order';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-bartender-home',
  templateUrl: './bartender-home.page.html',
  styleUrls: ['./bartender-home.page.scss'],
})
export class BartenderHomePage {
  ordersAux: order[] = [
    {
      id: '1',
      numberTable: 4,
      products: [
        {
          id: '1',
          name: 'Cerveza',
          description: 'Cerveza artesanal',
          time: 10,
          price: 5,
          isFood: false,
          photoUrl: [
            'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983',
          ],
          quantity: 2,
        },
        {
          id: '2',
          name: 'Gaseosa',
          description: 'Coca cola',
          time: 10,
          price: 5,
          isFood: false,
          photoUrl: [
            'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983',
          ],
          quantity: 2,
        },
      ],
      creationTime: Date.now(),
      price: 10,
      state: orderState.InPreparation,
      barFinished: false,
      kitchenFinished: false,
    },
    {
      id: '2',
      numberTable: 6,
      products: [
        {
          id: '3',
          name: 'Hamburguesa',
          description: 'Hamburguesa de carne',
          time: 15,
          price: 8,
          isFood: true,
          photoUrl: [
            'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983',
          ],
          quantity: 1,
        },
        {
          id: '7',
          name: 'papas',
          description: 'papas fritas',
          time: 15,
          price: 8,
          isFood: false,
          photoUrl: [
            'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983',
          ],
          quantity: 1,
        },
      ],
      creationTime: Date.now(),
      price: 8,
      state: orderState.InPreparation,
      barFinished: false,
      kitchenFinished: false,
    },
    {
      id: '3',
      numberTable: 8,
      products: [
        {
          id: '4',
          name: 'Café',
          description: 'Café negro',
          time: 5,
          price: 3,
          isFood: false,
          photoUrl: [
            'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983',
          ],
          quantity: 1,
        },
      ],
      creationTime: Date.now(),
      price: 3,
      state: orderState.InPreparation,
      barFinished: true,
      kitchenFinished: true,
    },
  ];
  public orders: Array<any> = [];
  constructor(private firebase: DataBaseService, private utils: UtilsService) {
    //testear con firebase
    this.firebase
      .getObservable(enumCollectionNames.Orders)
      .subscribe((pedidos) => {
        let pedidosAux: order[] = pedidos as order[];
        this.orders = [];
        pedidosAux.forEach((item) => {
          if (item.state == orderState.InPreparation) {
            const nonFoodProducts = item.products.filter(
              (product) => !product.isFood
            );
            if (nonFoodProducts.length > 0) {
              this.orders.push({
                ...item,
                products: nonFoodProducts,
              });
            }
          }
        });
        const mensaje = `Se ha añadido un nuevo pedido a la lista de espera en preparacion`;
        this.utils.SendPushNotification('Nuevo Pedido', mensaje);
      });
  }

  finalizeOrder(order: order) {
    this.utils
      .showSweet({
        title: 'AFinalización de Pedido',
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
          // table.idCurrentClient = this.client.id;
          // table.state = enumTableState.Reserved;
          // this.firebase.saveData(enumCollectionNames.Tables,table,table.number.toString())
          //   .then(() => {
          //     //this.firebase.deleteData(enumCollectionNames.WaitingRoom, this.client.id);
          //     loading.dismiss();
          //     this.modalController.dismiss();
          //   })
          //   .catch((error) => {
          //     let mensaje = this.utils.translateAuthError(error.code);
          //     this.utils.showSweet({
          //       titleText: mensaje.title,
          //       text: mensaje.content,
          //       icon: 'error',
          //     });
          //   });
        }
      });
  }
}
