import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage implements OnInit {
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
    private storageService: StorageService
  ) {
    this.newClient = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dni: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(8),
          this.validateNumber,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      img: [''],
    });
    this.anonymous = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      img: ['']
    });
  }

  ngOnInit() {}

  capturarImg(data: IImagen) {
    this.imageObject = data;
  }

  validateNumber(control: AbstractControl): object | null {
    const telefono = control.value;
    const soloNumeros = /^\d+$/;
    if (!soloNumeros.test(telefono)) {
      return { soloNumeros: true };
    }
    return null;
  }

  async onRegister() {
    try {
      await this.ionLoaderService.simpleLoader();
      const downloadURL = await this.storageService.uploadImageAndGetURL(this.imageObject, enumStoragePaths.Users);
      (this.segmentValue === 'clienteNuevo')
        ? this.registerCustomer(this.newClient, downloadURL)
        : this.registerAnonimous(this.anonymous,downloadURL);
    } catch (error: any) {
      const message = error.message || 'Error al subir la imagen';
      this.ionToastService.showToastError(message);
    } finally {
      this.resetFormImg()
      this.ionLoaderService.dismissLoader();
    }
  }
  
  private async registerAnonimous(formGroup: FormGroup, photoUrl: string) {
    const anonimousData :anonimusClient = this.getAnonymus(formGroup,photoUrl);
    const userAnonimous = await this.auth.registerAnonymous();
    if(userAnonimous != null){
      anonimousData.id = userAnonimous.user.uid;
      await this.dataBase.saveUser(enumCollectionNames.Clients, anonimousData, anonimousData.id);
      this.router.navigate(['/client-home']);
    }
  }

  private async registerCustomer(formGroup: FormGroup, downloadURL: string) {
    const customerData: client= this.getClient(formGroup,downloadURL);
    const userAccessData: userAccessData = this.getuserAccessData(formGroup);
    const result = this.auth.register(userAccessData);
    if(result != null ){
      let user = (await result).user;
      customerData.id = user.uid;
      this.dataBase.saveUser(enumCollectionNames.Clients, customerData, user.uid);
      this.ionToastService.showToastSuccess('Le haremos saber por correo electrónico una vez que su registro haya sido aprobado.');
      this.router.navigate(['/login']);
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
  
  getClient(newClient:FormGroup, photoUrl:string): client {
    const data: client= {
      id : newClient.get('email')?.value,
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

  getAnonymus(anonymous: FormGroup,photoUrl:string): anonimusClient{
    const data :anonimusClient = {
      id : "",
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
