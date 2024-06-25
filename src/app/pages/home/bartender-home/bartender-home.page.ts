import { Component } from '@angular/core';
import { orderState } from 'src/app/enums/orderState';
import { order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-bartender-home',
  templateUrl: './bartender-home.page.html',
  styleUrls: ['./bartender-home.page.scss'],
})
export class BartenderHomePage {
  orders: order[] = [
    {
      id: '1',
      idTable: '4',
      products: [
        {
          id: '1',
          name: 'Cerveza',
          description: 'Cerveza artesanal',
          time: 10,
          price: 5,
          isFood: false,
          photoUrl: ['https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983'],
          quantity: 2
        },
        {
          id: '2',
          name: 'Gaseosa',
          description: 'Coca cola',
          time: 10,
          price: 5,
          isFood: false,
          photoUrl: ['https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983'],
          quantity: 2
        }
      ],
      creationTime: Date.now(),
      price: 10,
      state: orderState.InPreparation,
      barFinished: false,
      kitchenFinished: false
  },
  {  
    id: '2',
    idTable: '6',
    products: [
      {
        id: '3',
        name: 'Hamburguesa',
        description: 'Hamburguesa de carne',
        time: 15,
        price: 8,
        isFood: true,
        photoUrl: ['https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983'],
        quantity: 1
      },
      {
        id: '7',
        name: 'cerveza',
        description: 'cerveza artesanal',
        time: 15,
        price: 8,
        isFood: false,
        photoUrl: ['https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983'],
        quantity: 1
      }
    ],
    creationTime: Date.now(),
    price: 8,
    state: orderState.InPreparation,
    barFinished: false,
    kitchenFinished: false
  }, {
    id: '3',
    idTable: '8',
    products: [
      {
        id: '4',
        name: 'Café',
        description: 'Café negro',
        time: 5,
        price: 3,
        isFood: false,
        photoUrl: ['https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fproducts%2Fcostilla%20de%20cerdo0.1719015681138?alt=media&token=4c73e4e2-ec12-4384-a4a2-50699cb57983'],
        quantity: 1
      }
    ],
    creationTime: Date.now(),
    price: 3,
    state: orderState.InPreparation,
    barFinished: true,
    kitchenFinished: true
  }
];
  constructor() { 
  
  }
}
