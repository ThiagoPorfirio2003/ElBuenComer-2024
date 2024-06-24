import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { order } from 'src/app/interfaces/order';
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
  public products! : Array<product>;
  public showChat : boolean;
  public canShowFood : boolean;
  public canShowDrink : boolean;

  public orderPrice : number;
  public order! : order;

  constructor(private auth: AuthService, private dataBase : DataBaseService, private utilsService : UtilsService,
    private loader : IonLoaderService) 
    { 
      this.showChat = false;
      this.canShowFood = true;
      this.canShowDrink = true;
      this.orderPrice = 0;
    }

  ngOnInit(): void 
  {
    this.productSuscription = this.dataBase.getObservable(enumCollectionNames.Products)
    .subscribe((products : Array<any>)=>
    {
      this.products = products;
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

    productIndex = -0;

    /*
    for(let i : number = 0; i < this.products.length; i++) 
    {
      if(this.products[i] == productId)
      {
        productIndex = i;
        break;
      }
    }
    */

    return productIndex;
  }

  public addProduct(product : product)
  {
    //const productPosition : number;

    if(true)
    {

    }
  }
}
