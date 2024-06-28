import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Subscription } from 'rxjs';
import { enumClientState } from 'src/app/enums/clientState';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.page.html',
  styleUrls: ['./listado-clientes.page.scss'],
})
export class ListadoClientesPage implements OnInit, OnDestroy
{
  public clientes : Array<any> = []; 
  private flag : Boolean = false;
  private cantidad : number = 0
  private subscripcion : Subscription;

  constructor(private util : UtilsService, private firebase : DataBaseService) 
  {
      this.subscripcion =  this.firebase.getObservable(enumCollectionNames.Clients).subscribe((clientes)=>{
      this.clientes = [];
      clientes.forEach((item)=>{
        if(item["state"]== enumClientState.AwaitingApproval)
        {
          this.clientes.push(item);
        }
      })

      if(this.flag)
      {
        if(this.clientes.length > this.cantidad)
        {
          this.util.SendPushNotification("Nuevo Cliente", "Un nuevo cliente esta esperando a ser aceptado");
        }
      }
      else
      {
        this.flag = true;
      }
      this.cantidad = this.clientes.length;
    })
    
  }
  
  ngOnDestroy(): void 
  {
    this.subscripcion.unsubscribe()
  }

  ngOnInit() 
  {
    LocalNotifications.checkPermissions().then((permiso)=>{
      if(permiso.display != "granted")
      {
        this.util.showSweet({title: 'Permisos', text: 'Activa los permisos de las notificaciones'});
      }
    })
  }

  Permitir(cliente : any)
  {
    this.cambiar("Aceptar cliente","Estas seguro de querer aceptar al cliente: " + cliente.name, enumClientState.Accepted, cliente, "Has sido aceptado");
  }

  Denegar(cliente : any)
  {
    this.cambiar("Denegar cliente","Estas seguro de querer denegar al cliente: " + cliente.name, enumClientState.Rejected, cliente, "Has sido rechazado");
  }

  private cambiar(title : string, text : string, estado : enumClientState, cliente : any, mensajeMail : string)
  {
    this.util.showSweet({title: title, text: text, showCancelButton: true,
      cancelButtonText:"No, cambie de opinión", confirmButtonText: "Estoy seguro" })
    .then((result)=>
    {
      if(result.isConfirmed)
      {
        cliente.state = estado;
        this.firebase.saveUser(enumCollectionNames.Clients,cliente,cliente.id)
        this.util.sendEmail(cliente.name, mensajeMail, cliente.email);
      }
    })
  }
}
