import { Component, OnInit } from '@angular/core';
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
      this.util.SendPushNotification("Nuevo Cliente", "Un nuevo cliente esta esperando a ser registrado");
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
    this.cambiar("Aceptar Cliente","Estas seguro de querer aceptar al cliente: " + cliente.name, enumClientState.Accepted, cliente);
  }

  Denegar(cliente : any)
  {
    this.cambiar("Denegar Cliente","Estas seguro de querer denegar al cliente: " + cliente.name, enumClientState.Rejected, cliente);
  }

  private cambiar(title : string, text : string, estado : enumClientState, cliente : any)
  {
    this.util.showSweet({title: title, text: text, 
      cancelButtonText:"no, cambie de opinion", confirmButtonText: "Estoy seguro" })
    .then((result)=>
    {
      if(result)
      {
        cliente.state = estado;
        this.firebase.saveUser(enumCollectionNames.Clients,cliente,cliente.id)
      }
    })
  }
}
