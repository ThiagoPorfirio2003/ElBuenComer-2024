import { Injectable } from '@angular/core';
import { order } from '../interfaces/order';
import { Table } from '../interfaces/table';

@Injectable({
  providedIn: 'root'
})
export class TableManagementService {

  public table! : Table;
  public order! : order;

  public isInRestaurant! : boolean;
  public isInWaitingRoom! : boolean;
  public hasTable! : boolean;
  public hasOrder! : boolean;

  constructor() 
  { 
    this.isInRestaurant = false;
    this.resetInsideFlagsFlags();
  }

  public loadTable(table : Table)
  {
    this.table = table;
    this.hasTable = true;
  }

  public loadOrder(order : order)
  {
    this.order = order
    this.hasOrder = true;
  }

  public resetInsideFlagsFlags()
  {
    this.isInWaitingRoom = false;
    this.hasTable = false;
    this.hasOrder = false;
  }
}
