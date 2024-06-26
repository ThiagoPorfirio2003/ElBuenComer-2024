import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, elementAt } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { orderState } from 'src/app/enums/orderState';
import { enumTableState } from 'src/app/enums/tableState';
import { order } from 'src/app/interfaces/order';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.page.html',
  styleUrls: ['./waiter-home.page.scss'],
})
export class WaiterHomePage implements OnInit , OnDestroy
{
  private flag : boolean = false;
  private cantidad : number = 0;
  public arrayPedidos : Array<any> = [];
  private subscripcion : Subscription | undefined;
  constructor(private firebase: DataBaseService, private util : UtilsService) { }

  ngOnInit() 
  {
      this.subscripcion = this.firebase.getObservable(enumCollectionNames.Orders).subscribe((ordenes)=>{
      this.arrayPedidos = [];
      this.arrayPedidos = [...ordenes];
      this.arrayPedidos.forEach((pedido)=>
      {
        if(pedido.state == orderState.InPreparation && (pedido.kitchenFinished && pedido.barFinished))
          {
            pedido.state = orderState.Finished;
          }
      })
      if(this.flag)
      {
        if(this.arrayPedidos.length > this.cantidad)
        {
          this.util.SendPushNotification("Nuevo Pedido", "Una mesa ah hecho un nuevo pedido");
        }
      }
      else
      {
        this.flag = true;
      }
      this.cantidad = this.arrayPedidos.length;
    })
  }

  ngOnDestroy(): void 
  {
    this.subscripcion!.unsubscribe();
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

  AceptarPaga(pedido : order)
  {
    this.firebase.deleteData(enumCollectionNames.Orders,pedido.id);
    this.firebase.getDocRef(enumCollectionNames.Tables, pedido.numberTable.toString()).then((retorno)=>{
      let mesa = retorno.data();
      console.log(mesa)
      mesa!["idCurrentClient"] = "";
      mesa!["state"] = enumTableState.Free;
      console.log(mesa)
      this.firebase.saveData(enumCollectionNames.Tables,mesa,mesa!["number"].toString());
    })
  }
}
