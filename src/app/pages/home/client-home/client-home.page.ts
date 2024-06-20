import { Component, OnInit } from '@angular/core';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumQR } from 'src/app/enums/QR';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.page.html',
  styleUrls: ['./client-home.page.scss'],
})
export class ClientHomePage   
{
    public isInWaitingRoom : boolean;

    constructor(private auth: AuthService, private dataBase : DataBaseService, private utilsService : UtilsService) 
    { 
      this.isInWaitingRoom = false;
    }

    public analiceQR(qrType : enumQR)
    {
      switch(qrType)
      {
        case enumQR.Entrada:
          if(this.isInWaitingRoom)
          {
            console.log('Fracaso');
          }
          else
          {
            console.log('Pudiste entrar al restaurant');
          }
          break;
          
        case enumQR.Mesa:
          if(this.isInWaitingRoom)
          {
            console.log('PUDISTE TOMAR UNA MESA');
          }
          else
          {
            console.log('FRACASO');
          }
          break;

        default: 
          console.log('FRACASO');
          break;
      }
    }

    private goInRestaurant()
    {
      this.dataBase.saveData(enumCollectionNames.WaitingRoom, this.auth.userData, this.auth.userData.id)
      .then(()=>
      {
        this.isInWaitingRoom = true;
      })
    }

}
