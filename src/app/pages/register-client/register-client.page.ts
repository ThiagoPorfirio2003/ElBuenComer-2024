import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
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
    private ionToastService: IonToastService,
    private dataBase: DataBaseService,
    private ionLoaderService: IonLoaderService,
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

  validateDni(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^\d{8}$/.test(value);
    return isValid ? null : { invalidDni: true };
  }

  async onRegister() {
      const loading = await this.utiles.getLoadingCtrl({spinner: 'circular'});
      await loading.present();
      if(this.segmentValue === 'clienteNuevo'){
        const userAccessData: userAccessData = this.getuserAccessData(this.newClient);
        this.auth.register(userAccessData).then((data)=> {
          this.storageService.uploadImageAndGetURL(this.imageObject, enumStoragePaths.Users).then((downloadURL)=> {
            const customerData: client= this.getClient(this.newClient,downloadURL,data.user.uid);
            this.dataBase.saveUser(enumCollectionNames.Clients, customerData, data.user.uid).then(() => {
              loading.dismiss();
              this.ionToastService.showToastSuccess('Le haremos saber por correo electrónico una vez que su registro haya sido aprobado.');
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
            const anonimousData :anonimusClient = this.getAnonymus(this.anonymous,downloadURL,data.user.uid);
            this.dataBase.saveUser(enumCollectionNames.Clients, anonimousData, data.user.uid).then(() => {
              loading.dismiss();
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
  
  getClient(newClient:FormGroup, photoUrl:string, id:string): client {
    const data: client= {
      id,
      name : newClient.get('name')?.value,
      email : newClient.get('email')?.value,
      profile : enumProfile.Client,
      photoUrl,
      surname : newClient.get('lastName')?.value,
      dni : newClient.get('dni')?.value,
      state: enumClientState.AwaitingApproval,
    }
    return data
  }

  getuserAccessData(newClient: FormGroup): userAccessData {
    const userAccessData: userAccessData = {
      email: newClient.get('email')?.value,
      password : newClient.get('password')?.value,
    }
    return userAccessData;
  }

  getAnonymus(anonymous: FormGroup,photoUrl:string, id:string): anonimusClient{
    const data :anonimusClient = {
      id,
      name : anonymous.get('name')?.value!,
      email : "Email de prueba",
      profile : enumProfile.AnonimusClient,
      photoUrl,
      state: enumClientState.AwaitingApproval,
    };
    return data
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
}
