import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseUserData, completeUserData, employe, userAccessData } from 'src/app/Interfaces/user';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UtilsService } from 'src/app/services/utils.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit 
{

  public descripcion: string = "";
  public nombre: string = "";
  public precio: number= 0;
  public tiempo: number= 0;
  public image : any = null;
  public fotos: Array<any> = [];
  public path : string = "../../../../assets/icon/icon.png";
  public grupo : FormGroup;

  constructor(private fb : FormBuilder, private utiles : UtilsService, private firebase : DataBaseService, private auth : AuthService, private storage : StorageService) 
  {
    this.fotos.push(this.path);
    this.fotos.push(this.path);
    this.fotos.push(this.path);
    this.grupo = this.fb.group(
    {
      nombre :["",[Validators.required,Validators.minLength(1),Validators.maxLength(51)]],
      descripcion :["",[Validators.required,Validators.minLength(1),Validators.maxLength(51)]],
      precio :["",[Validators.required,Validators.min(1)]],
      tiempo :["",[Validators.required,Validators.min(1)]],
    });
  }

  ngOnInit() {}

  async TomarFoto(index: number)
  {
    let image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    
    if(image.dataUrl)
    {
      this.fotos[index] = image.dataUrl;
    }
  }

  ingresar()
  {
    if(!this.fotos.includes(this.path))
    {
      if(this.grupo.valid)
      {
        for (let index = 0; index < this.fotos.length; index++) 
        {
          const element = this.fotos[index];
          this.storage.savePhoto(element,this.nombre+index+"."+Date.now()).then((url)=>
          {
            //firebase
          })
          .catch((error)=>{
            let mensaje = this.utiles.translateAuthError(error);
            this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
          })
        }
        /*
        this.storage.savePhoto(this.image,this.).then((url)=>
        {
          this.user.completeData.baseData.photoUrl = url;
          console.log(this.user);
          this.firebase.saveUser(enumCollectionNames.Employes,this.user,userRegistrado.user.uid)
          .catch((error)=>{
            let mensaje = this.utiles.translateAuthError(error);
            this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
          })
        })
        .catch((error)=>{
          let mensaje = this.utiles.translateAuthError(error);
          this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
        })*/
      }
      else
      {
        let mensaje = this.utiles.translateAuthError("CI");
        this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"warning"})
      }
    }
    else
    {
      let mensaje = this.utiles.translateAuthError("FF");
      this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"warning"})
    }
  }
}
