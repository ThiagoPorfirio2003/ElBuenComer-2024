import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UtilsService } from 'src/app/services/utils.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { StorageService } from 'src/app/services/storage.service';
import { enumStoragePaths } from 'src/app/enums/storagePaths';
import { product } from 'src/app/interfaces/products';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit 
{
  public arrayFotosMostrar : Array<string>;
  public producto : product;
  public path : string = "../../../../assets/icon/icon.png";
  public grupo : FormGroup;

  constructor(private fb : FormBuilder, private utiles : UtilsService, private firebase : DataBaseService, private auth : AuthService, private storage : StorageService) 
  {
    this.producto = {} as product
    this.producto.photoUrl = [];
    this.arrayFotosMostrar = [];
    this.arrayFotosMostrar.push(this.path);
    this.arrayFotosMostrar.push(this.path);
    this.arrayFotosMostrar.push(this.path);
    this.grupo = this.fb.group(
    {
      nombre :["",[Validators.required,Validators.minLength(1),Validators.maxLength(51)]],
      descripcion :["",[Validators.required,Validators.minLength(1),Validators.maxLength(51)]],
      precio :["",[Validators.required,Validators.min(1)]],
      tiempo :["",[Validators.required,Validators.min(1)]]
    });
  }

  ngOnInit() {
  }

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
      this.producto.photoUrl[index] = image;
      this.arrayFotosMostrar[index] = image.dataUrl;
    }
  }

  async ingresar()
  {
    if(!this.arrayFotosMostrar.includes(this.path))
    {
      if(this.grupo.valid)
      {
        let arrayPromesasFotos = Array<Promise<string>>();
        for (let index = 0; index < this.producto.photoUrl.length; index++) 
        {
          const element = this.producto.photoUrl[index];

          arrayPromesasFotos.push(this.storage.savePhoto(element,enumStoragePaths.Products,this.producto.name+index+"."+Date.now()));
        }
        Promise.all(arrayPromesasFotos).then((urlPhotos)=>
        {
          this.producto.photoUrl = urlPhotos;
          this.firebase.saveData(enumCollectionNames.Products,this.producto)
          .then((a)=>
          {
            this.utiles.showSweet({titleText:"Producto Guardado",text:"el producto se guardo correctamente",icon:"success"});
            console.log(a);
          })
          .catch((error)=>{
            let mensaje = this.utiles.translateAuthError(error);
            this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
            console.log(error);
          })
        })
        .catch((error)=>{
          let mensaje = this.utiles.translateAuthError(error);
          this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
          console.log(error);
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
      let mensaje = this.utiles.translateAuthError("FF");
      this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"warning"})
    }
  }
}