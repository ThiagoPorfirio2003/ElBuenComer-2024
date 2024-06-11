import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseUserData, completeUserData, employe, userAccessData } from 'src/app/Interfaces/user';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.page.html',
  styleUrls: ['./owner.page.scss'],
})
export class OwnerPage implements OnInit 
{
  public path : string = "../../../../assets/icon/icon.png";
  public user : employe;
  public registro : userAccessData
  public grupo : FormGroup;

  constructor(private fb : FormBuilder, private utiles : UtilsService) 
  {
    this.user ={} as employe;
    this.user.completeData = {} as completeUserData;
    this.user.completeData.baseData = {} as baseUserData;
    this.registro={} as userAccessData;
    this.grupo = this.fb.group
    ({
      email : ["",[Validators.required,Validators.email,Validators.minLength(14),Validators.maxLength(71)]],
      contraseña :["",[Validators.required]],
      nombre :["",[Validators.required,Validators.minLength(1),Validators.maxLength(51)]],
      apellido :["",[Validators.required,Validators.minLength(1),Validators.maxLength(51)]],
      dni :["",[Validators.required,Validators.min(9999999), Validators.max(70000000)]],
      cuil :["",[Validators.required,Validators.min(9999999999), Validators.max(70000000000)]],
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
          alert("subido")
        }
        else
        {
          this.utiles.showSweet({titleText:"CUIDADO",text:this.utiles.translateAuthError("CI"),icon:"warning"})
        }
      }
      else
      {
        this.utiles.showSweet({titleText:"CUIDADO",text:"Elija el tipo de perfil",icon:"warning"})
      }
    }
    else
    {
      this.utiles.showSweet({titleText:"CUIDADO",text:this.utiles.translateAuthError("FF"),icon:"warning"})
    }
  }

}
