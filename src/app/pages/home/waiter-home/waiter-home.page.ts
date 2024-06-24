import { Component, OnInit } from '@angular/core';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.page.html',
  styleUrls: ['./waiter-home.page.scss'],
})
export class WaiterHomePage implements OnInit 
{
  public arrayPedidos : Array<any> = [];
  public arrayPagos : Array<any> = [];
  constructor(private firebase: DataBaseService) { }

  ngOnInit() 
  {
    this.firebase.getObservable(enumCollectionNames.Orders).subscribe((ordenes)=>{
      this.arrayPedidos = [...ordenes];
      this.arrayPedidos.forEach((pedido)=>{
        if(pedido.cocinaTerminado && pedido.barTerminado)
          {
            pedido.estadoPedido = "terminado";
          }
      })
    })
  }

  Aceptar(pedido : any)
  {
    //verificar tipo de producto y cmabiar el estado de cocina y/o bartender
  }

  Eliminar(pedido : any)
  {
    this.firebase.deleteData(enumCollectionNames.Orders,pedido.id);
  }

  Llevar(pedido : any)
  {
    //cambiar estado pedido a llevar
  }
}
