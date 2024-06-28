import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { anonimusClient, client, completeUserData, userAccessData } from 'src/app/interfaces/user';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import IImagen from 'src/app/interfaces/image';
import { StorageService } from 'src/app/services/storage.service';
import { enumProfile } from 'src/app/enums/profile';
import { enumClientState } from 'src/app/enums/clientState';
import { enumStoragePaths } from 'src/app/enums/storagePaths';
import { UtilsService } from 'src/app/services/utils.service';
import { message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage {
  public newClient: FormGroup;
  public anonymous: FormGroup;
  segmentValue: string = 'clienteNuevo';

  imageObject: IImagen = {
    img: '../../../assets/images/usuario.png',
    name: '',
    exist: false,
  };

  constructor(
    private fb: FormBuilder,
    private dataBase: DataBaseService,
    private router: Router,
    private auth: AuthService,
    private storageService: StorageService,
    private utiles: UtilsService,
  ) {
    this.newClient = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, this.validateDni]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password02: ['', [Validators.required, Validators.minLength(6)]],
      img: [''],
    });
    this.anonymous = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      img: ['']
    });
  }

  capturarImg(data: IImagen) {
    this.imageObject = data;
  }

  capturarForm(data:FormGroup ){
    this.anonymous = data;
  }

  validateDni(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^\d{8}$/.test(value);
    return isValid ? null : { invalidDni: true };
  }

  async onRegister() {

      const loading = await this.utiles.getLoadingCtrl({spinner: 'circular'});

      await loading.present();
      if(this.segmentValue === 'clienteNuevo'){

        if(this.confirmPassword()){
          loading.dismiss();
          this.utiles.showSweet({titleText:"Error",text:"Las contraseñas no coinciden",icon:"error"});
          return;
        }
       
        const userAccessData: userAccessData = this.getuserAccessData(this.newClient);
        this.auth.register(userAccessData).then((data)=> {
          this.storageService.uploadImageAndGetURL(this.imageObject, enumStoragePaths.Users).then((downloadURL)=> {
            const customerData: client= this.getClient(downloadURL,data.user.uid);
            this.dataBase.saveUser(enumCollectionNames.Clients, customerData, data.user.uid).then(() => {
              loading.dismiss();
              this.resetFormImg();
              let mensaje:message = {
                title:"Registro Exitoso",
                content: "Le haremos saber por correo electrónico una vez que su registro haya sido aprobado",
              }
              this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"success"})
              this.router.navigate(['/login']);
            })
            .catch((error)=>{
              loading.dismiss();
              let mensaje = this.utiles.translateAuthError(error.code);
              this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"})
            });
          }).catch((error)=>{
            loading.dismiss();
            let mensaje = this.utiles.translateAuthError(error.code);
            this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"});
          });
        }).catch((error)=>{
          loading.dismiss();
          let mensaje = this.utiles.translateAuthError(error.code);
          this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"});
        });
      }else{
        this.auth.registerAnonymous().then((data) => {
          this.storageService.uploadImageAndGetURL(this.imageObject, enumStoragePaths.Users).then((downloadURL)=> {
            const anonimousData :anonimusClient = this.getAnonymus(downloadURL,data.user.uid);
            this.dataBase.saveUser(enumCollectionNames.Clients, anonimousData, data.user.uid).then(() => {
              this.auth.logUserData(anonimousData);
              loading.dismiss();
              this.resetFormImg();
              this.router.navigate(['/client-home']);
            }).catch((error)=>{
              loading.dismiss();
              let mensaje = this.utiles.translateAuthError(error.code);
              this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"});
            });
          }).catch((error)=>{
            loading.dismiss();
            let mensaje = this.utiles.translateAuthError(error.code);
            this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"});
          });
        }).catch((error)=>{
          loading.dismiss();
          let mensaje = this.utiles.translateAuthError(error.code);
          this.utiles.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"});
        });
      }
  }
  
  analyzeQR()
  {
    CapacitorBarcodeScanner.scanBarcode({hint: 2, cameraDirection: 1,scanOrientation: 1})
    .then((value)=>
    {
      const dniRed : Array<string> = value.ScanResult.split('@');
      const controls = this.newClient.controls;
      controls['name'].setValue(dniRed[2]);
      controls['lastName'].setValue(dniRed[1]);
      controls['dni'].setValue(parseInt(dniRed[4]));
    });
  }
  
  getClient(photoUrl:string, id:string): client {
    return {
      id,
      name : this.newClient.get('name')?.value,
      email : this.newClient.get('email')?.value,
      profile : enumProfile.Client,
      photoUrl,
      surname : this.newClient.get('lastName')?.value,
      dni : this.newClient.get('dni')?.value,
      state: enumClientState.AwaitingApproval,
    }
  }

  getuserAccessData(newClient: FormGroup): userAccessData {
    return {
      email: newClient.get('email')?.value,
      password : newClient.get('password')?.value,
    }
  }

  getAnonymus(photoUrl:string, id:string): anonimusClient{
    return {
      id,
      name : this.anonymous.get('name')?.value!,
      email : "Email de prueba",
      profile : enumProfile.AnonimusClient,
      photoUrl,
      state: enumClientState.Accepted,
    };
  }

  resetFormImg(){
    this.anonymous.reset();
    this.newClient.reset();
    this.imageObject = {
      img: '../../../assets/images/usuario.png',
      name: '',
      exist: false,
    };
  }
  confirmPassword():boolean{
    const password = this.newClient.get('password')?.value;
    const password02 = this.newClient.get('password02')?.value;
    return password != password02;
  }
}
