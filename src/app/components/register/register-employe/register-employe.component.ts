/*
IGNORAR
*/

import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { enumProfile } from 'src/app/enums/profile';
import { message } from 'src/app/interfaces/message';
import { outPutResult, status } from 'src/app/interfaces/outPutResult';
import { baseUserData, completeUserData, employe, userAccessData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register-employe',
  templateUrl: './register-employe.component.html',
  styleUrls: ['./register-employe.component.scss'],
})
export class RegisterEmployeComponent{

  @Output() OutPutRestoreAppState : EventEmitter<void>;
  @Output() OutPutRegisterUser : EventEmitter<outPutResult<any>>;

  public registerForm : FormGroup;
  
  private formValues : any;

  public emailErrorText : string;
  public passwordErrorText : string;
  public nameErrorText : string;
  public surnameErrorText : string;
  public DNIErrorText : string;
  public CUIL_StartErrorText : string;
  public CUIL_EndErrorText : string;

  public profiles : Array<any>;
  public profileSelected : any;

  public urlImage : string;
  public photo! : Photo;

  constructor(private utilsService : UtilsService,
    private authService : AuthService
  ) 
  { 
    this.OutPutRestoreAppState = new EventEmitter<void>();
    this.OutPutRegisterUser = new EventEmitter<outPutResult<employe>>();

    this.emailErrorText = '';
    this.passwordErrorText = ''
    this.nameErrorText = '';
    this.surnameErrorText = '';
    this.DNIErrorText = '';
    this.CUIL_StartErrorText = '';
    this.CUIL_EndErrorText = '';

    this.urlImage = '';
    this.profiles = 
    [
      {value: enumProfile.Maitre, background: '#d62828'},
      {value: enumProfile.Waiter, background: '#f3de2c'},
      {value: enumProfile.Chef, background: '#7cb518'},
      {value: enumProfile.Bartender, background: '#dc0073'}
    ];

    this.profileSelected = {value: 0};

    this.registerForm = inject(FormBuilder).group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$')]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$')]],
      DNI: [, [Validators.required, Validators.min(10000000), Validators.max(69999999)]],
      CUIL_Start: [, [Validators.required, Validators.min(10), Validators.max(99)]],
      CUIL_End: [, [Validators.required, Validators.min(0), Validators.max(9)]]
    })
  }

  public enumToWord(value : enumProfile) : string
  {
    let word : string;

    switch(value)
    {
      case enumProfile.Maitre:
        word = 'Maître'
        break;

      case enumProfile.Waiter:
        word = 'Mozo'
        break;

      case enumProfile.Chef:
        word = 'Cocinero'
        break;

      case enumProfile.Bartender:
        word = 'Bartender'
        break;

      default:
        word = 'Elija un perfil'
        break;
    }

    return word;
  }

  //#region Error text

  public changeEmailErrorText()
  {
    let errors : any;

    errors = this.registerForm.controls['email'].errors
    this.emailErrorText = '';

    if(errors)
    {
      if(errors.required)
      {
        this.emailErrorText = 'Este campo no puede estar vacío';
      }
      else
      {
        if(errors.email)
        {
          this.emailErrorText = 'El correo ingresado no es válido';
        }
        else
        {
          if(errors.maxlength)
            {
              this.emailErrorText = 'Se superaron los 60 caracteres';
            }
        }
      }
    }
  }

  public changePasswordErrorText()
  {
    let errors : any;

    errors = this.registerForm.controls['password'].errors
    this.passwordErrorText = '';

    if(errors)
    {
      if(errors.required)
      {
        this.passwordErrorText = 'Este campo no puede estar vacío';
      }
      else
      {
        if(errors.minlength)
        {
          this.passwordErrorText = 'No se alcanzaron los 6 caracteres';
        }
        else
        {
          if(errors.maxlength)
            {
              this.passwordErrorText = 'Se superaron los 30 caracteres';
            }
        }
      }
    }
  }

  public changeNameErrorText()
  {
    let errors : any;

    errors = this.registerForm.controls['name'].errors
    this.nameErrorText = '';

    if(errors)
    {
      if(errors.required)
      {
        this.nameErrorText = 'Este campo no puede estar vacío';
      }
      else
      {
        if(errors.minlength)
        {
          this.nameErrorText = 'No se alcanzaron los 2 caracteres';
        }
        else
        {
          if(errors.maxlength)
          {
            this.nameErrorText = 'Se superaron los 50 caracteres';
          }
          else
          {
            if(errors.pattern)
            {
              this.nameErrorText = 'El nombre no puede tener espacios al inicio o final, tampoco puede tener más de 1 espacio entre los nombres';
            }
          }
        }
      }
    }
  }

  public changeSurnameErrorText()
  {
    let errors : any;

    errors = this.registerForm.controls['surname'].errors
    this.surnameErrorText = '';

    if(errors)
    {
      if(errors.required)
      {
        this.surnameErrorText = 'Este campo no puede estar vacío';
      }
      else
      {
        if(errors.minlength)
        {
          this.surnameErrorText = 'No se alcanzaron los 2 caracteres';
        }
        else
        {
          if(errors.maxlength)
          {
            this.surnameErrorText = 'Se superaron los 50 caracteres';
          }
          else
          {
            if(errors.pattern)
            {
              this.surnameErrorText = 'El apellido no puede tener espacios al inicio o final, tampoco puede tener más de 1 espacio entre los apellidos';
            }
          }
        }
      }
    }
  }

  public changeDNIErrorText()
  {
    let errors : any;

    errors = this.registerForm.controls['DNI'].errors
    this.DNIErrorText = '';

    if(errors)
    {
      if(errors.required)
      {
        this.DNIErrorText = 'El DNI no puede estar vacío';
      }
      else
      {
        if(errors.min)
        {
          this.DNIErrorText = 'El DNI mínimo es 10000000';
        }
        else
        {
          if(errors.max)
          {
            this.DNIErrorText = 'El DNI máximo es 69999999';
          }
        }
      }
    }
  }

  public changeCUIL_StartErrorText()
  {
    let errors : any;

    errors = this.registerForm.controls['CUIL_Start'].errors
    this.CUIL_StartErrorText = '';

    if(errors)
    {
      if(errors.required)
      {
        this.CUIL_StartErrorText = 'El CUIL inicial no puede estar vacío';
      }
      else
      {
        if(errors.min)
        {
          this.CUIL_StartErrorText = 'El CUIL inicial no puede ser menor a 10';
        }
        else
        {
          if(errors.max)
          {
            this.CUIL_StartErrorText = 'El CUIL inicial no puede ser mayor a 99';
          }
        }
      }
    }
  }
    
  public changeCUIL_EndErrorText()
  {
    let errors : any;

    errors = this.registerForm.controls['CUIL_End'].errors
    this.CUIL_EndErrorText = '';

    if(errors)
    {
      if(errors.required)
      {
        this.CUIL_EndErrorText = 'El CUIL final no puede estar vacío';
      }
      else
      {
        if(errors.min)
        {
          this.CUIL_EndErrorText = 'El CUIL final no puede ser menor a 0';
        }
        else
        {
          if(errors.max)
          {
            this.CUIL_EndErrorText = 'El CUIL final no puede ser mayor a 9';
          }
        }
      }
    }
  }

  //#endregion

  public takeImg()
  {
    this.formValues = this.registerForm.value

    Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })
    .then((img)=>
    {
      this.urlImage = img.dataUrl!;
      this.photo = img;
    })
    .finally(()=> 
    {
      this.OutPutRestoreAppState.emit();
      this.registerForm.setValue(this.formValues);
    })
  }

  /*
  private saveAppState() {
    this.appStateBeforeCamera = {
      route: this.utilsService.getRoute(), 
      authUser : this.authService.getAuthUser(),
      logedUserData : this.authService.logedUserData,
      formValues : this.registerForm.value
    };
  }
  */


  /*
  private restoreAppState() {
    console.log(this.appStateBeforeCamera);
    this.authService.changeCurrentUser(this.appStateBeforeCamera.authUser, this.appStateBeforeCamera.myUser);
    this.utilsService.changeRoute(this.appStateBeforeCamera.route);
    this.registerForm.setValue(this.appStateBeforeCamera.formValues)
  }
  */

  public analyzeQR()
  {
    CapacitorBarcodeScanner.scanBarcode({hint: 2, cameraDirection: 1,scanOrientation: 1})
    .then((value)=>
    {
      const dniRed : Array<string> = value.ScanResult.split('@');
      const controls = this.registerForm.controls;
      const CUIL_complete : number = parseInt(dniRed[8]);

      controls['surname'].setValue(dniRed[1]);
      controls['name'].setValue(dniRed[2]);
      controls['CUIL_Start'].setValue(Math.floor(CUIL_complete / 10));
      controls['DNI'].setValue(parseInt(dniRed[4]));
      controls['CUIL_End'].setValue(CUIL_complete % 10);
    })
    //ScanResult = 00561167632@APELLIDO@NOMBRES@SEXO(M O F)@DNI@A@25/02/1992@1/12/2039@205 (20= Inicio del CUIL, 5= final del CUIL)
  }

  private validateData() : status
  {
    const dataStatus : status = {success: this.registerForm.valid}

    if(dataStatus.success)
    {
      if(this.profileSelected.value > 1)
      {
        if(this.urlImage == '')
        {
          dataStatus.success = false;
          dataStatus.errorCode = 'FFO';

          const errorMessage : message = this.utilsService.translateAuthError('FFO')
  
          this.utilsService.showSweet({title: errorMessage.title, text: errorMessage.content, icon: 'warning', 
            cancelButtonText: 'Volver', showCancelButton: true,
            confirmButtonText: 'Si'})
          .then((value)=>
          {
            if(value.isConfirmed)
            {
              dataStatus.success = true;
              dataStatus.errorCode = undefined;
            }
          })
        }
      }
      else
      {
        dataStatus.success = false;
        dataStatus.errorCode = 'FP'
      }
    }

    return dataStatus;
  }

  public registerEmploye()
  {
    const dataStatus : status = this.validateData();
    const formValues = this.registerForm.value;

    const userAccessData : userAccessData =
    {
      email: formValues['email'],
      password: formValues['password']
    }

    const employData : employe =
    {
      email: formValues['email'],
      name: formValues['name'],
      surname: formValues['surname'],
      dni: formValues['DNI'].toString(),
      cuil: formValues['CUIL_Start'].toString() + formValues['DNI'].toString() + formValues['CUIL_End'].toString(),
      profile: this.profileSelected.value,
      id: '',
      photoUrl: '' 
    }

    if(dataStatus.success || dataStatus.errorCode != 'FFO')
    {
      dataStatus.success = true;
      this.OutPutRegisterUser.emit(
      { 
        status: dataStatus,
        data:
        {
          accessUserData: userAccessData,
          userData: employData,
          photo: this.photo
        }
      })
    }
  }
}
