import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public orderPrice : number;
  public productsSelected : Array<productInOrder>;
  public cookingTime : number;

  //Recorrer el array de productosElegidos para saber si hay una comida o bebida
  constructor(public auth: AuthService, 
    private dataBase : DataBaseService,
    private utilsService : UtilsService,
    private loader : IonLoaderService,
    private tableManagementService : TableManagementService) 
    { 
      this.canShowFood = true;
      this.canShowDrink = true;

      this.orderPrice = 0;
      this.productsSelected = new Array<productInOrder>();
      this.cookingTime = 0;
    }

  ngOnInit() 
  {
    this.productSuscription = this.dataBase.getObservable(enumCollectionNames.Products)
    .subscribe((products : Array<any>)=>
    {
      this.productsToShow = products;
    })
  }

  ngOnDestroy(): void {
    if(!this.productSuscription.closed)
    {
      this.productSuscription.unsubscribe();
    }
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
          id: this.dataBase.getNextId(enumCollectionNames.Orders),
          numberTable : 0,//this.tableManagementService.table.number,
          products : this.productsSelected,
          creationTime : this.cookingTime,
          price : this.orderPrice,
          state : orderState.ForApproval,
          barFinished : true,
          kitchenFinished : true,
        }

        //this.tableManagementService.table.state = enumTableState.withOrder;
        this.tableManagementService.order = order
        this.productSuscription.unsubscribe();

        const promises : Array<Promise<void>>= new Array<Promise<void>>();

        //promises.push(this.dataBase.saveData(enumCollectionNames.Orders, order));
        //promises.push(this.dataBase.updateData(enumCollectionNames.Tables, this.tableManagementService.table, this.tableManagementService.table.number.toString()));

        //await Promise.all(promises);    

        this.utilsService.changeRoute('/order')
        
        modal.dismiss()
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
      this.utilsService.showSweet({title:'Error', text: 'El pedido esta vacío', icon: 'error'})
    }
  }
}
