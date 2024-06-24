import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { order, productInOrder } from 'src/app/interfaces/order';
import { product } from 'src/app/interfaces/products';
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

  constructor(private auth: AuthService, private dataBase : DataBaseService, private utilsService : UtilsService,
    private loader : IonLoaderService) 
    { 
      this.canShowFood = true;
      this.canShowDrink = true;

      this.orderPrice = 0;
      this.productsSelected = new Array<productInOrder>();
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
    this.productSuscription.unsubscribe();
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
      this.productsSelected.push(
        {
          id: product.id, 
          name: product.name,
          description: product.description, 
          time: product.time,
          price: product.price,
          isFood: product.isFood,
          photoUrl : product.photoUrl, 
          quantity: 1
        })
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
      }

      this.orderPrice-= product.price;
    }
  }
}
