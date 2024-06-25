import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumQR } from 'src/app/enums/QR';
import { enumTableState } from 'src/app/enums/tableState';
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
      private loader : IonLoaderService) 
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

        for(let i : number = 0;i < tables.length;i++)
        {
          
          if(tables[i].idCurrentClient === this.auth.getAuthUser()!.uid)
          {
            this.userTable = tables[i];
            this.tableNumberToShow = this.userTable.number.toString();
            this.tablesSuscription.unsubscribe();
            break;
          }
        }
      })

    }

    public ngOnDestroy(): void 
    {
      if(!this.tablesSuscription.closed)
      {
        this.tablesSuscription.unsubscribe();
      }
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
                this.goToTable();
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
      try
      {
        await this.loader.simpleLoader()
        await this.dataBase.saveData(enumCollectionNames.WaitingRoom, this.auth.userData, this.auth.userData.id);
        this.isInWaitingRoom = true
      }
      catch(e)
      {
        
      }
      finally
      {
        this.loader.dismissLoader();
      }
    }

    private async goToTable()
    {
      await this.loader.simpleLoader()

      this.userTable.state = enumTableState.InUse;

      this.dataBase.updateData(enumCollectionNames.Tables, this.userTable, this.userTable.number.toString())
      .then(()=>
      {
        this.auth.userTable = this.userTable;
        this.loader.dismissLoader();
        this.utilsService.changeRoute('table');
      })
      .catch(()=> 
      {
        this.userTable.state = enumTableState.Reserved;
        this.loader.dismissLoader();
      })
    }

}
