import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
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

  constructor(private auth: AuthService, private dataBase : DataBaseService, private utilsService : UtilsService,
    private loader : IonLoaderService) 
    { 
      this.showChat = false;
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
}
