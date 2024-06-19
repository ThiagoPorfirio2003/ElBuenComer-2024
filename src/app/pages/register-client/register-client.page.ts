import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { userAccessData } from 'src/app/interfaces/user';
import { IImagen } from 'src/app/interfaces/image';

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
    img: '../../../assets/icon/icon_empleado.png',
    name: '',
    exist: false,
  };
  
  constructor(
    private fb: FormBuilder,
    private ionToastService: IonToastService,
    private dataBase: DataBaseService,
    private ionLoaderService: IonLoaderService,
    private router: Router,
    private auth: AuthService
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
      enabled: ['Pendiente'],
      profile: ['cliente'],
    });
    this.anonymous = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      img: [''],
      profile: ['anonimo'],
    });
  }

  ngOnInit() {
    //this.scannerService.init();
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
      //continuar con la camara generar un componente generico.
      this.ionLoaderService.simpleLoader();
      // const downloadURL = await this.uploadImageAndGetURL(this.imageObject);
      (this.segmentValue === 'clienteNuevo')
        ? this.registerCustomer(this.newClient, "downloadURL")
        : this.registerAnonimous(this.anonymous, "downloadURL");
    } catch (error: any) {
      const message = error.message || 'Error al subir la imagen';
      this.ionToastService.showToastError(message);
    } finally {
      this.ionLoaderService.dismissLoader();
    }
  }
  private async registerAnonimous(formGroup: FormGroup, downloadURL: string) {
    try{
      formGroup.patchValue({ img: downloadURL });
      const anonimousData :any = formGroup.value;
      const userAnonimous = await this.auth.registerAnonymous();
      console.log(userAnonimous)
      await this.dataBase.saveData(enumCollectionNames.Anonymous, anonimousData, userAnonimous?.uid);
      formGroup.reset();
      this.router.navigate(['/home']);
    }catch(error:any){
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode: ",errorCode);
      console.log("errorMessage: ",errorMessage);
    }
  }

  private async registerCustomer(formGroup: FormGroup, downloadURL: string) {
    formGroup.patchValue({ img: downloadURL });
    const customerData:any = formGroup.value;
    await this.auth.register(customerData as userAccessData);
    await this.dataBase.saveData(enumCollectionNames.Clients, customerData, customerData.email);
    formGroup.reset();
    this.ionToastService.showToastSuccess('Le haremos saber por correo electrónico una vez que su registro haya sido aprobado.');
    this.router.navigate(['/login']);
  }

  // async uploadImageAndGetURL(imageObject: ICamera) {
  //   try {
  //     const imageBlob = await fetch(imageObject.img).then((response) =>
  //       response.blob()
  //     );
  //     const imgRef = ref(this.storage, `images/${imageObject.name}`);
  //     await uploadBytes(imgRef, imageBlob);
  //     return getDownloadURL(imgRef);
  //   } catch (error: any) {
  //     throw new Error('Error al cargar la imagen: ' + error.message);
  //   }
  // }

  leerDNI() {
    /*
    this.scannerService.scan()
      .then(barcodes => {
        if (barcodes && barcodes.length > 0) {
          const firstBarcode = barcodes[0];
          const rawValue = firstBarcode.rawValue;
          const parts = rawValue.split('@');
          const lastName = parts[1];
          const name = parts[2];
          const dni = parts[4];
          this.newClient.patchValue({
            name: name,
            lastName: lastName,
            dni: dni,
          });
          this.ionToastService.showToastSuccess('Datos recuperados con éxito');
        } else {
          this.ionToastService.showToastError('No se encontraron códigos de barras');
        }
      })
      .catch(error => {
        console.error('Error al escanear:', error);
        this.ionToastService.showToastError('Error al escanear el DNI');
      });
      ;*/
  }
}
