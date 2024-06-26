import { Component, OnInit } from '@angular/core';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { orderState } from 'src/app/enums/orderState';
import { enumQR } from 'src/app/enums/QR';
import { bill } from 'src/app/interfaces/bill';
import { order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { TableManagementService } from 'src/app/services/table-management.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage{

  public surveyIsCompleted : boolean;
  public showPayModal : boolean;
  public bill! : bill;

  constructor(public utilsService : UtilsService, 
    private databaseService : DataBaseService, 
    private authService : AuthService,
    public tableManagementService : TableManagementService,
    private loader : IonLoaderService)
    { 
      this.surveyIsCompleted = false;
      this.showPayModal = false;
    }

    public async checkOrderState()
    {
      try
      {
        const scanValue = await this.utilsService.detectarQR(enumQR.Mesa);
  
        if(scanValue.retorno && scanValue.valor == this.tableManagementService.table.number)
        {
          await this.loader.simpleLoader();
  
          const redOrder = await this.databaseService.getDataById(enumCollectionNames.Orders, this.tableManagementService.order.id);
        
          if(redOrder.size == 0)
          {
            console.log('Tu pedido ha sido cancelado')
          }
          else
          {
            if(redOrder.size == 1)
            {
              this.tableManagementService.order = redOrder.docs[0].data() as order;
            }
            else
            {
              console.log('Hay varias mesas con el mismo currentClient')
            }
          }
        }
        else
        {
          this.utilsService.showSweet({title: 'Error', text: 'El QR es inválido o pertenece a otra mesa'})
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
  
    public async showBill()
    {
      try
      {
      const scanValue = await this.utilsService.detectarQR(enumQR.Propina);
  
        if(scanValue.retorno)
        {
          const tipPercentage : number = parseInt(scanValue.valor);
          let subTotal : number;
          let tip : number;
          let bill : bill;
  
          subTotal = 0;
  
          this.tableManagementService.order.products.forEach((product)=>
          {
            subTotal+= product.price * product.quantity;
          })
  
          tip = tipPercentage * subTotal / 100;
  
          bill = {
            id : '',
            idOrder : this.tableManagementService.order.id,
            idClient : this.authService.userData.id,
            products : this.tableManagementService.order.products,
            subTotal : subTotal,
            tip : tip,
            total: tip + subTotal
          }
  
          this.bill = bill;
          this.showPayModal = true;
        }
        else
        {
          this.utilsService.showSweet({title: 'Error', text: 'El QR es inválido o pertenece a otra mesa'})
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
  
    public async markOrderAsReceived()
    {
      try
      {
        await this.loader.simpleLoader();
        this.tableManagementService.order.state = orderState.Accepted;
        this.databaseService.updateData(enumCollectionNames.Orders, this.tableManagementService.order.state, this.tableManagementService.order.id);
      }
      catch(e)
      {
        this.tableManagementService.order.state = orderState.GivingOut;
        console.log(e)
      }
      finally
      {
        this.loader.dismissLoader();
      }
    }
  
    public async payBill()
    {
      /*
      try
      {
        await this.loader.simpleLoader();
        const newORder : order = 
        {
          id : this.order.id,
          numberTable : this.order.numberTable,
          products : this.order.products,
          creationTime : this.order.creationTime,
          price : this.order.price,
          state : orderState.PaidAccepted,
          barFinished : true,
          kitchenFinished : true
        }
  
        await this.dataBase.updateData(enumCollectionNames.Orders, newORder, this.order.id);
        this.order.state = orderState.Paid;
      }
      catch(e)
      {
        this.order.state = orderState.Accepted
      }
      finally
      {
        this.loader.dismissLoader();
      }
      */
    }

}