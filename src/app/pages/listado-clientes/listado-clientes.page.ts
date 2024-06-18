import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Title } from '@angular/platform-browser';
import { LocalNotifications } from '@capacitor/local-notifications';
import { enumClientState } from 'src/app/enums/clientState';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.page.html',
  styleUrls: ['./listado-clientes.page.scss'],
})
export class ListadoClientesPage implements OnInit 
{
  public clientes : Array<any> = []; 

  constructor(private util : UtilsService, private firebase : DataBaseService) 
  {
    this.firebase.getObservable(enumCollectionNames.Clients).subscribe((clientes)=>{
      this.clientes = [];
      clientes.forEach((item)=>{
        if(item["state"]== enumClientState.AwaitingApproval)
        {
          this.clientes.push(item);
        }
      })
    })
    
  }

  ngOnInit() {
    LocalNotifications.checkPermissions().then((permiso)=>{
      if(permiso.display != "granted")
      {
        this.util.showSweet({title: 'Permisos', text: 'Activa los permisos de las notificaciones'});
      }
    })
  }


  Permitir(cliente : any)
  {
    cliente.state = enumClientState.Accepted;
    this.firebase.saveUser(enumCollectionNames.Clients,cliente,cliente.id)
  }

  Denegar(cliente : any)
  {
    cliente.state = enumClientState.Rejected;
    this.firebase.saveUser(enumCollectionNames.Clients,cliente,cliente.id)
  }
}
