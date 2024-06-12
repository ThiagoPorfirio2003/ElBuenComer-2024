import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseUserData, completeUserData, employe, userAccessData } from 'src/app/Interfaces/user';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UtilsService } from 'src/app/Services/utils.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.page.html',
  styleUrls: ['./owner.page.scss'],
})
export class OwnerPage implements OnInit 
{
  private image : any = null;
  public path : string = "../../../../assets/icon/icon.png";
  public user : employe;
  public registro : userAccessData
  public grupo : FormGroup;

  constructor(private fb : FormBuilder, private utiles : UtilsService, private firebase : DataBaseService, private auth : AuthService, private storage : StorageService) 
  {
    this.user ={} as employe;
    this.user.completeData = {} as completeUserData;
    this.user.completeData.baseData = {} as baseUserData;
    this.registro={} as userAccessData;
    this.grupo = this.fb.group(
    {
      email : ["",[Validators.required,Validators.email,Validators.minLength(14),Validators.maxLength(71)]],
      contraseña :["",[Validators.required]],
      nombre :["",[Validators.required,Validators.minLength(1),Validators.maxLength(51)]],
      apellido :["",[Validators.required,Validators.minLength(1),Validators.maxLength(51)]],
      dni :["",[Validators.required,Validators.min(9999999), Validators.max(70000000)]],
      cuil :["",[Validators.required]],
    });
  }

  ngOnInit() {}


  Tipo(id : number)
  {
    let dueño = document.getElementById("dueño") as HTMLButtonElement ;
    let supervisor = document.getElementById("supervisor") as HTMLButtonElement ;

    if(id == 1)
    {
      dueño.style.background = "none";
      supervisor.style.background = "red";
    }
    else
    {
      dueño.style.background = "red";
      supervisor.style.background = "none";
    }

    this.user.completeData.baseData.profile = id;
  }


  async TomarFoto()
  {
    let image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    
    if(image.dataUrl)
    {
      this.image = image;
      this.path = image.dataUrl;
    }
  }

  ingresar()
  {
    if(this.path != "../../../../assets/icon/icon.png")
    {
      if(this.user.completeData.baseData.profile!=undefined)
      {
        if(this.grupo.valid)
        {
          this.firebase.getUserByDNI(this.user.completeData.dni).then((user)=>
          {
            console.log(user);
            if(user.size ==0)
            {
              this.user.completeData.baseData.email = this.registro.email;
              this.auth.register(this.registro).then((userRegistrado)=>{
                this.storage.savePhoto(this.image,this.user.completeData.dni.toString()).then((url)=>
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
                })
              })
              .catch((error)=>{
                let mensaje = this.utiles.translateAuthError(error);
                this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
              })
            }
            else
            {
              this.utiles.showSweet({titleText:"Error",text:"Persona ya registrada",icon:"warning"})
            }

          })
          .catch((error)=>{
            let mensaje = this.utiles.translateAuthError(error);
          this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
          })
        }
        else
        {
          let mensaje = this.utiles.translateAuthError("CI");
          this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"warning"})
        }
      }
      else
      {
        let mensaje = this.utiles.translateAuthError("FP");
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
