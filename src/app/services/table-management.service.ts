import { Injectable } from '@angular/core';
import { order } from '../interfaces/order';
import { Table } from '../interfaces/table';

@Injectable({
  providedIn: 'root'
})
export class TableManagementService {

  public table! : Table;
  public order! : order;
  public isInRestaurant : boolean;
  public isInWaitingRoom : boolean;

  constructor() 
  { 
    this.isInRestaurant = false;
    this.isInWaitingRoom = false;
  }
}
