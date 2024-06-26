import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { orderState } from 'src/app/enums/orderState';
import { enumQR } from 'src/app/enums/QR';
import { enumTableState } from 'src/app/enums/tableState';
import { order, productInOrder } from 'src/app/interfaces/order';
import { product } from 'src/app/interfaces/products';
import { Table } from 'src/app/interfaces/table';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit, OnDestroy{

  private productSuscription! : Subscription;
  public productsToShow! : Array<product>;
  public canShowFood : boolean;
  public canShowDrink : boolean;
  public productsSelected : Array<productInOrder>;
  public orderPrice : number;
  public foodsSelected : Array<productInOrder>;
  public drinksSelected : Array<productInOrder>;
  public cookingTime : number;
  
  public order! : order;
  public hasOrder : boolean;
  public surveyIsCompleted : boolean;

  constructor(public auth: AuthService, private dataBase : DataBaseService, private utilsService : UtilsService,
    private loader : IonLoaderService) 
    { 
      this.canShowFood = true;
      this.canShowDrink = true;

      this.orderPrice = 0;
      this.productsSelected = new Array<productInOrder>();
      this.foodsSelected = new Array<productInOrder>();
      this.drinksSelected = new Array<productInOrder>();
      this.cookingTime = 0;
      this.hasOrder = false;
      this.surveyIsCompleted = false; 
    }

  ngOnInit(): void 
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

  public showAll()
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

  private findProduct(whereToLook : Array<productInOrder>, productId : string) : number
  {
    let productIndex : number;

    productIndex = -1;

    for(let i : number = 0; i < whereToLook.length; i++) 
    {
      if(whereToLook[i].id == productId)
      {
        productIndex = i;
        break;
      }
    }
   
    return productIndex;
  }

  public addProduct(product : product) : void
  {
    const productIndex : number = this.findProduct(this.productsSelected, product.id);

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
      
      if(product.isFood)
      {
        if(this.findProduct(this.foodsSelected, product.id) == -1)
        {
          this.foodsSelected.push(newProductSelected)        
        }     
      }
      else
      {
        if(this.findProduct(this.drinksSelected, product.id) == -1)
        {
          this.foodsSelected.push(newProductSelected)        
        }     
      }
    }
    else
    {
      this.productsSelected[productIndex].quantity++;
    }

    this.orderPrice+= product.price;
  }

  public deleteProduct(product : product) : void
  {
    let productIndex : number = this.findProduct(this.productsSelected, product.id);

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

        if(product.isFood)
        {
          productIndex = this.findProduct(this.foodsSelected, product.id);
          this.foodsSelected.splice(productIndex,1)
        }
        else
        {
          productIndex = this.findProduct(this.drinksSelected, product.id);
          this.drinksSelected.splice(productIndex,1)
        }
      }
      this.orderPrice-= product.price;
    }
  }

  public async confirmOrder()
  {
    if(this.productsSelected.length > 0)
    {
      try
      {
        await this.loader.simpleLoader();

        const order : order =
        {
          id: this.dataBase.getNextId(enumCollectionNames.Orders),
          numberTable : this.auth.userTable.number,
          products : this.productsSelected,
          creationTime : this.cookingTime,
          price : this.orderPrice,
          state : orderState.ForApproval,
          barFinished : this.drinksSelected.length > 0 ? false : true,
          kitchenFinished : this.foodsSelected.length > 0 ? false : true,
        }

        this.auth.userTable.state = enumTableState.withOrder;
        this.dataBase.saveData(enumCollectionNames.Orders, order)
        this.order = order;
        this.productSuscription.unsubscribe();
        this.hasOrder = true;

        this.dataBase.updateData(enumCollectionNames.Tables, this.auth.userTable, this.auth.userTable.number.toString())
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
      this.utilsService.showSweet({title:'Error', text: 'El pedido esta vacio', icon: 'error'})
    }
  }

  public async updateOrderState()
  {
    try
    {
      const scanValue = await this.utilsService.detectarQR(enumQR.Mesa);

      if(scanValue.retorno && scanValue.valor == this.auth.userTable.number)
      {
        await this.loader.simpleLoader();

        const redOrder = await this.dataBase.getDataById(enumCollectionNames.Orders, this.order.id);
      
        if(redOrder.size == 1)
        {
          this.order = redOrder.docs[0].data() as order;
        }
        else
        {
          console.log('Hay varias mesas con el mismo currentClient')
        }
      }
      else
      {
        this.utilsService.showSweet({title: 'Error', text: 'El QR es invalido o pertenece a otra mesa'})
      }
    }
    catch(e)
    {
      console.log(e);
    }
    finally
    {
      this.loader.dismissLoader();
    }
  }

  public payOrder()
  {
    try
    {

    }
    catch
    {

    }
    finally
    {

    }
  }
}
