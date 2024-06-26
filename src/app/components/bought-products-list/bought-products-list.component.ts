import { Component, Input, OnInit } from '@angular/core';
import { productInOrder } from 'src/app/interfaces/order';

@Component({
  selector: 'app-bought-products-list',
  templateUrl: './bought-products-list.component.html',
  styleUrls: ['./bought-products-list.component.scss'],
})
export class BoughtProductsListComponent
{

  @Input({required: true}) productsToShow! : Array<productInOrder>
  @Input({required: true}) showPrice! : boolean;

  constructor() 
  {
  }

}
