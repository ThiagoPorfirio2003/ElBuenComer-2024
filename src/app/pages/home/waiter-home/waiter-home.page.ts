import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { orderState } from 'src/app/enums/orderState';
import { order } from 'src/app/interfaces/order';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.page.html',
  styleUrls: ['./waiter-home.page.scss'],
})
export class WaiterHomePage implements OnInit 
{
  public arrayPedidos : Array<any> = [];
  public arrayPagos : Array<any> = [];
  constructor(private firebase: DataBaseService, private util : UtilsService) { }

  ngOnInit() 
  {
    this.firebase.getObservable(enumCollectionNames.Orders).subscribe((ordenes)=>{
      this.arrayPedidos = [];
      this.arrayPedidos = [...ordenes];
      this.arrayPedidos.forEach((pedido)=>
      {
        if(pedido.state == orderState.InPreparation && (pedido.kitchenFinished && pedido.barFinished))
          {
            pedido.state = orderState.Finished;
          }
      })
      this.util.SendPushNotification("Nuevo Pedido", "Una mesa ah hecho un nuevo pedido");
    })
  }

  Aceptar(pedido : order)
  { 
    this.util.showSweet({title: "Pedido", text: "Estas seguro de confirmar el pedido", showCancelButton: true,
      cancelButtonText:"No, cambie de opinión", confirmButtonText: "Estoy seguro" , cancelButtonColor: "red"})
    .then((result)=>
    {
      if(result.isConfirmed)
      {
        pedido.products.find((element)=>{
          if(element.isFood)
          {
            pedido.kitchenFinished = false;
          }
        })
        pedido.products.find((element)=>{
          if(!element.isFood)
          {
            pedido.barFinished = false;
          }
        })
        pedido.state = orderState.InPreparation;
        this.firebase.saveData(enumCollectionNames.Orders,pedido,pedido.id)
      }
    })
  }

  Eliminar(pedido : order)
  {
    this.util.showSweet({title: "Pedido", text: "Estas seguro de eliminar el pedido", showCancelButton: true,
      cancelButtonText:"No, cambie de opinión", confirmButtonText: "Estoy seguro" , cancelButtonColor: "red"})
    .then((result)=>
    {
      if(result.isConfirmed)
      {
        this.firebase.deleteData(enumCollectionNames.Orders,pedido.id);
      }
    })
  }

  Llevar(pedido : order)
  {
    pedido.state = orderState.GivingOut;
    this.firebase.saveData(enumCollectionNames.Orders,pedido,pedido.id)
  }

  /*AceptarPaga(paga : order)
  {

  }*/
}
