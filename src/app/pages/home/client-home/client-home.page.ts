import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GraphicCommentsComponent } from 'src/app/components/graphic-comments/graphic-comments.component';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumQR } from 'src/app/enums/QR';
import { enumTableState } from 'src/app/enums/tableState';
import { Table } from 'src/app/interfaces/table';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { TableManagementService } from 'src/app/services/table-management.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.page.html',
  styleUrls: ['./client-home.page.scss'],
})
export class ClientHomePage implements OnDestroy
{
    //public userTable! : Table;
    public tableNumberToShow : string;

    private tablesSuscription! : Subscription;

    constructor(private auth: AuthService, private dataBase : DataBaseService, private utilsService : UtilsService,
      private loader : IonLoaderService, public tableManagement : TableManagementService,
      private modalController: ModalController) 
    { 
      this.tableNumberToShow = 'Aun por asignar';
    }


    public ngOnDestroy(): void 
    {
      if(this.tablesSuscription != undefined && !this.tablesSuscription.closed)
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
            if(this.tableManagement.isInRestaurant)
            {
              this.utilsService.showSweet({title:'Error', text: 'Ya estás adentro del local',icon: 'error', confirmButtonText: 'Entendido'})
            }
            else
            {
              this.tableManagement.isInRestaurant = true;
            }
            break;
            
          case enumQR.Mesa:
            if(this.tableManagement.isInWaitingRoom)
            {
              if(this.tableManagement.hasTable)
              {
                if(this.tableManagement.table.number == parseInt(QRValues[1]))
                {
                  this.goToTable();
                }
                else
                {
                  this.utilsService.showSweet({title:'Mesa inválida', text: 'Tu mesa es la ' + this.tableManagement.table.number, icon: 'error', confirmButtonText: 'Entendido'})
                }
              }
              else
              {
                this.utilsService.showSweet({title:'QR inválido', text: 'Aún no se te ha asignado ninguna mesa',icon: 'error', confirmButtonText: 'Entendido'})
              }

              /*
              if(this.userTable == undefined)
              {
                this.utilsService.showSweet({title:'QR inválido', text: 'Aún no se te ha asignado ninguna mesa',icon: 'error', confirmButtonText: 'Entendido'})
              }
              else
              {
                if(this.userTable.number == parseInt(QRValues[1]))
                {
                  this.goToTable();
                }
                else
                {
                  this.utilsService.showSweet({title:'Mesa invalida', text: 'Tu mesa es la ' + this.userTable.number,icon: 'error', confirmButtonText: 'Entendido'})
                }
              }*/
            }
            else
            {
              this.utilsService.showSweet({title:'Acceso denegado', text: 'No podés vincularte con una mesa sin estar en la sala de espera',icon: 'error', confirmButtonText: 'Entendido'});
            }
            break;
  
          default: 
            this.utilsService.showSweet({title:'QR inválido', text: 'No sirve de nada la propina ahora',icon: 'error', confirmButtonText: 'Entendido'});
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
        this.tableManagement.isInWaitingRoom = true

        this.tablesSuscription = this.dataBase.getObservable(enumCollectionNames.Tables)
        .subscribe((redTables : Array<any>)=>
        {
          const tables : Array<Table> = redTables;
  
          this.tableNumberToShow = 'Aun por asignar';

          for(let i : number = 0;i < tables.length;i++)
          {
            if(tables[i].idCurrentClient === this.auth.getAuthUser()!.uid)
            {
              this.tableManagement.loadTable(tables[i]);
              this.tableNumberToShow = tables[i].number.toString();
              this.tablesSuscription.unsubscribe();
              break;
            }
          }
        })
  
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

      this.tableManagement.table.state = enumTableState.InUse;

      this.dataBase.updateData(enumCollectionNames.Tables, this.tableManagement.table, this.tableManagement.table.number.toString())
      .then(()=>
      {
        //this.auth.userTable = this.userTable;
        this.loader.dismissLoader();
        this.utilsService.changeRoute('/dining-menu');
      })
      .catch(()=> 
      {
        //this.userTable.state = enumTableState.Reserved;
        this.tableManagement.table.state = enumTableState.Reserved;
        this.loader.dismissLoader();
      })
    }

    async openSurvey() {
      const modal = await this.modalController.create({component: GraphicCommentsComponent});
      return await modal.present();
    }
}
