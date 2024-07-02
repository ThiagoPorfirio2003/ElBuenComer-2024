import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { orderState } from 'src/app/enums/orderState';
import { enumTableState } from 'src/app/enums/tableState';
import { order, productInOrder } from 'src/app/interfaces/order';
import { product } from 'src/app/interfaces/products';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { TableManagementService } from 'src/app/services/table-management.service';
import { UtilsService } from 'src/app/services/utils.service';

import { register } from 'swiper/element/bundle';
register();


@Component({
  selector: 'app-dining-menu',
  templateUrl: './dining-menu.page.html',
  styleUrls: ['./dining-menu.page.scss'],
})
export class DiningMenuPage implements OnInit, OnDestroy {

  private productSuscription! : Subscription;

  public productsToShow! : Array<product>;
  public canShowFood : boolean;
  public canShowDrink : boolean;
  public orderPrice! : number;
  public productsSelected! : Array<productInOrder>;
  public cookingTime! : number;

  public messages : Array<any>;
  public messagesSus! : Subscription;

  //Recorrer el array de productosElegidos para saber si hay una comida o bebida

  /*
  public products : Array<productInOrder>;
  public tip : number;
  public subTotal : number;
  public total : number;
  */

  constructor(public auth: AuthService, 
    private dataBase : DataBaseService,
    private utilsService : UtilsService,
    private loader : IonLoaderService,
    private tableManagementService : TableManagementService) 
    { 
      this.canShowFood = true;
      this.canShowDrink = true;

      this.resetData()
      this.messages = new Array<any>();
      /*
      this.products = new Array<productInOrder>();

      this.tip = 0;
      this.subTotal = 0;
      this.total = 0;
      */
    }

  ngOnInit() 
  {
    this.productSuscription = this.dataBase.getObservable(enumCollectionNames.Products)
    .subscribe((products : Array<any>)=>
    {
      this.productsToShow = products;
      /*
      for(let i : number = 0  ; i < this.productsToShow.length; i++)
      {
        const p = this.productsToShow[i];

        this.subTotal += p.price;

        this.products.push({
          id: p.id,
          name: p.name,
          description: p.description,
          time: p.time,
          price: p.price,
          isFood: p.isFood,
          photoUrl: p.photoUrl,
          quantity: i + 1
        })
      }
      */

      //this.tip = this.subTotal * 20 /100;
      //this.total = this.tip + this.subTotal;
    })

    this.messagesSus = this.dataBase.getObservable(enumCollectionNames.ChatRoom)
    .subscribe((messages)=>
    {
      this.messages = messages
    })
  }

  ngOnDestroy(): void {
    if(!this.productSuscription.closed)
    {
      this.productSuscription.unsubscribe();
    }

    this.messagesSus.unsubscribe();
  }

  private resetData()
  {
    this.productsSelected = new Array<productInOrder>();
    this.orderPrice = 0;
    this.cookingTime = 0;
  }

  public showAllProducts()
  {
    this.canShowFood = true;
    this.canShowDrink = true;
  }

  public showFood()
  {
    this.canShowFood = true;
    this.canShowDrink = false;
  }

  public showDrink()
  {
    this.canShowFood = false;
    this.canShowDrink = true;
  }

  private findProduct(productId : string) : number
  {
    let productIndex : number;

    productIndex = -1;

    for(let i : number = 0; i < this.productsSelected.length; i++) 
    {
      if(this.productsSelected[i].id == productId)
      {
        productIndex = i;
        break;
      }
    }

    return productIndex;
  }

  public addProduct(product : product) : void
  {
    const productIndex : number = this.findProduct(product.id);

    if(productIndex == -1)
    {
      const newProductSelected : productInOrder = 
      {
        id: product.id, 
        name: product.name,
        description: product.description, 
        time: product.time,
        price: product.price,
        isFood: product.isFood,
        photoUrl : product.photoUrl, 
        quantity: 1
      }

      if(this.cookingTime < newProductSelected.time)
      {
        this.cookingTime = newProductSelected.time;
      }

      this.productsSelected.push(newProductSelected);
    }
    else
    {
      this.productsSelected[productIndex].quantity++;
    }

    this.orderPrice+= product.price;
  }

  public deleteProduct(product : product) : void
  {
    const productIndex : number = this.findProduct(product.id);

    if(productIndex > -1)
    {
      const productFound = this.productsSelected[productIndex];

      if(productFound.quantity > 1)
      {
        this.productsSelected[productIndex].quantity--;
      }
      else
      {
        this.productsSelected.splice(productIndex,1);

        if(this.cookingTime == product.time)
        {
          this.cookingTime = 0;

          this.productsSelected.forEach((productToCompare)=>
          {
            if(this.cookingTime < productToCompare.time)
            {
              this.cookingTime = productToCompare.time
            }
          })
        }
      }
      this.orderPrice-= product.price;
    }
  }  

  public async confirmOrder(modal : IonModal)
  {
    if(this.productsSelected.length > 0)
    {
      try
      {
        await this.loader.simpleLoader();

        const order : order =
        {
          //Quizas el error es que no existe la coleccion de pedidos
          id: this.dataBase.getNextId(enumCollectionNames.Orders),
          numberTable : this.tableManagementService.table.number,
          products : this.productsSelected,
          creationTime : this.cookingTime,
          price : this.orderPrice,
          state : orderState.ForApproval,
          barFinished : true,
          kitchenFinished : true,
        }

        this.tableManagementService.table.state = enumTableState.withOrder;
        this.tableManagementService.loadOrder(order)
        //this.tableManagementService.order = order
        this.productSuscription.unsubscribe();

        const promises : Array<Promise<void>>= new Array<Promise<void>>();

        promises.push(this.dataBase.saveData(enumCollectionNames.Orders, this.tableManagementService.order, this.tableManagementService.order.id));
        promises.push(this.dataBase.updateData(enumCollectionNames.Tables, this.tableManagementService.table, this.tableManagementService.table.number.toString()));

        await Promise.all(promises);    

        this.utilsService.changeRoute('/order')
        
        modal.dismiss()
        .then(()=>
        {
          this.resetData();
        })
      }
      catch(e)
      {
        console.log(e);
      }
      finally
      {
        await this.loader.dismissLoader();
      }
    }
    else
    {
      this.utilsService.showSweet({title:'Error', text: 'El pedido esta vacío', icon: 'error', confirmButtonText: 'Entendido'})
    }
  }
}
