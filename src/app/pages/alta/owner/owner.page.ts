import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { employe, userAccessData } from 'src/app/Interfaces/user';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UtilsService } from 'src/app/services/utils.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
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

    this.user.profile = id;
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
      if(this.user.profile!=undefined)
      {
        if(this.ValidarCuil())
        {
          if(this.grupo.valid)
          {
            this.firebase.getUserByDNI(this.user.dni).then((user)=>
            {
              if(user.size ==0)
              {
                this.auth.register(this.registro).then((userRegistrado)=>{
                  this.user.email = this.registro.email;
                  this.storage.savePhoto(this.image,this.user.dni.toString()).then((url)=>
                  {
                    this.user.photoUrl = url;
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
                let mensaje = this.utiles.translateAuthError("PR");
                this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
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
          let mensaje = this.utiles.translateAuthError("CuI");
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

  public analyzeQR()
  {
    CapacitorBarcodeScanner.scanBarcode({hint: 2, cameraDirection: 1,scanOrientation: 1})
    .then((value)=>
    {
      const dniRed : Array<string> = value.ScanResult.split('@');
      const controls = this.grupo.controls;
      const CUIL_complete : number = parseInt(dniRed[8]);

      this.user.name = dniRed[2];
      this.user.surname = dniRed[1];
      this.user.dni = dniRed[4];
      this.user.cuil = Math.floor(CUIL_complete / 10) + "-" + dniRed[4] + "-" + CUIL_complete % 10
      
      /*controls['surname'].setValue(dniRed[1]);
      controls['name'].setValue(dniRed[2]);
      controls['CUIL_Start'].setValue(Math.floor(CUIL_complete / 10));
      controls['DNI'].setValue(parseInt(dniRed[4]));
      controls['CUIL_End'].setValue(CUIL_complete % 10);*/
    })
  }

  private ValidarCuil() : boolean
  {
    let retorno = false
    const regex = /^\d{2}-\d{8}-\d{1}$/;
    if(regex.test(this.user.cuil))
    {
      retorno = true
    }
    return retorno
  }

}
