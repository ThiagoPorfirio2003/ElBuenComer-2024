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
    public isInRestaurant : boolean;
    public userTableNumber : number;
    public tableNumberToShow : string;

    constructor(private auth: AuthService, private dataBase : DataBaseService, private utilsService : UtilsService) 
    { 
      this.isInWaitingRoom = false;
      this.isInRestaurant = false;
      this.userTableNumber = 0;
      this.tableNumberToShow = 'Aun por asignar';
    }

    public analiceQR(QRValues : Array<string>)
    {
      //Agregar la lectura del QR
      switch(QRValues[0])
      {
        case enumQR.Entrada:
          if(this.isInRestaurant)
          {
            console.log('Fracaso');
          }
          else
          {
            console.log('Pudiste entrar al restaurant');
            //this.goInRestaurant()
          }
          break;
          
        case enumQR.Mesa:
          if(this.isInWaitingRoom)
          {
            if(this.userTableNumber == parseInt(QRValues[1]))
            {
              console.log('PUDISTE TOMAR UNA MESA');
            }
            else
            {
              console.log('Esa mesa no es la tuya');
            }
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

    private goToTable(tableNumber : string)
    {
      this.dataBase.updateTableAvailability(false,tableNumber.toString())
      .then(()=>
      {
        this.utilsService.changeRoute('RUTA DE LA PAGINA DE LA MESA')
      })
    }

}
