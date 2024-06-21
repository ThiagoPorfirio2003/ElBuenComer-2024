import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumQR } from 'src/app/enums/QR';
import { Table } from 'src/app/interfaces/table';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.page.html',
  styleUrls: ['./client-home.page.scss'],
})
export class ClientHomePage implements OnInit, OnDestroy
{
    public isInWaitingRoom : boolean;
    public isInRestaurant : boolean;
    public userTable! : Table;
    public tableNumberToShow : string;

    private tablesSuscription! : Subscription;

    constructor(private auth: AuthService, private dataBase : DataBaseService, private utilsService : UtilsService,
      private loader : IonLoaderService
    ) 
    { 
      this.isInWaitingRoom = false;
      this.isInRestaurant = false;
      this.tableNumberToShow = 'Aun por asignar';
    }

    public ngOnInit(): void 
    {
      this.tablesSuscription = this.dataBase.getObservable(enumCollectionNames.Tables)
      .subscribe((redTables : Array<any>)=>
      {
        const tables : Array<Table> = redTables;
        console.log(tables)

        for(let i : number = 0;i < tables.length;i++)
        {
          
          if(tables[i].idCurrentClient === this.auth.getAuthUser()!.uid)
          {
            this.userTable = tables[i];
            this.tableNumberToShow = this.userTable.number.toString();
            break;
          }
        }
      })

    }

    public ngOnDestroy(): void {
      this.tablesSuscription.unsubscribe();
    }

    public async analiceQR()
    {
      this.utilsService.ScanQR()
      .then((scanResult)=>
      {
        const QRValues : Array<string> = scanResult.ScanResult.split('-');

        switch(QRValues[0])
        {
          case enumQR.Entrada:
            if(this.isInRestaurant)
            {
              this.utilsService.showSweet({title:'Error', text: 'Ya estás adentro del local',icon: 'error'})
            }
            else
            {
              this.isInRestaurant = true;
            }
            break;
            
          case enumQR.Mesa:
            if(this.isInWaitingRoom)
            {
              if(this.userTable.number == parseInt(QRValues[1]))
              {
                this.goToTable(this.userTable.number);
              }
              else
              {
                this.utilsService.showSweet({title:'Error', text: 'Esta mesa no es tuya',icon: 'error'})
              }
            }
            else
            {
              this.utilsService.showSweet({title:'Error', text: 'QR inválido',icon: 'error'});
            }
            break;
  
          default: 
            console.log(QRValues);
            break;
        }
      })
    }

    public async goInWaitingRoom()
    {
      await this.loader.simpleLoader()
      this.dataBase.saveData(enumCollectionNames.WaitingRoom, {}, this.auth.getAuthUser()!.uid)
      .then(()=>
      {
        this.isInWaitingRoom = true;
      })
      .finally(()=> this.loader.dismissLoader())
    }

    private async goToTable(tableNumber : number)
    {
      await this.loader.simpleLoader()
      this.dataBase.updateTableAvailability(false,tableNumber.toString())
      .then(()=>
      {
        this.loader.dismissLoader();
      })
      .finally(()=> this.loader.dismissLoader())
    }

}
