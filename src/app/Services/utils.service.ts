import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions } from '@ionic/angular';
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { message } from '../interfaces/message';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public splashScreenHasShown : boolean;

  constructor(private loadingController : LoadingController,
    private router : Router) 
    { 
      this.splashScreenHasShown = false;
    }

  public getSweet(options : SweetAlertOptions)
  {
    options.heightAuto = false;
    return Swal.mixin(options)
  }

  public showSweet(options : SweetAlertOptions)
  {
    return this.getSweet(options).fire()
  }

  public getLoadingCtrl(options: LoadingOptions)
  {
    return this.loadingController.create(options)
  }

  public changeRoute(newRoute : string)
  {
    this.router.navigate([newRoute]);
  }

  public getRoute()
  {
    return this.router.url;
  }

  public translateAuthError(errorMessage : string) : message
  {
    const errorMessageTranslated : message = {title: '', content: ''};
    
    switch(errorMessage)
    {
      case "auth/invalid-email": 
        errorMessageTranslated.title = 'Correo inválido'
        errorMessageTranslated.content = "El correo no cumple con el siguiente formato (ejemplo@gmail.com)";
      break;

      case "auth/email-already-in-use": 
        errorMessageTranslated.title = 'Correo inválido'
        errorMessageTranslated.content = "El correo ya pertenece a otro usuario";
        break;

      case "auth/email-already-in-use": 
        errorMessageTranslated.title = 'Correo inválido'
        errorMessageTranslated.content = 'El correo ya está registrado';
        break;

      case "auth/weak-password":    
        errorMessageTranslated.title = 'Clave inválida'   
        errorMessageTranslated.content = "La clave debe de tener más de 6 caracteres";
      break;

      case "auth/missing-password": 
        errorMessageTranslated.title = 'Clave inválida'   
        errorMessageTranslated.content = "No se ingresó  la clave";
      break;

      case "auth/invalid-credential":
      case "auth/invalid-login-credentials": 
        errorMessageTranslated.title = 'Datos inválidos'   
        errorMessageTranslated.content = "Los datos no pertenecen ningún usuario";
        break;

      case "CE":
        errorMessageTranslated.title = 'Cuenta inválida'
        errorMessageTranslated.content = 'La cuenta esta en espera de aprobación'
        break;

      case "NV": 
        errorMessageTranslated.title = 'Cuenta inválida'
        errorMessageTranslated.content = 'La cuenta no está verificada'
      break;

      case "NH":
        errorMessageTranslated.title = 'Cuenta inválida'
        errorMessageTranslated.content = 'La cuenta no está habilitada'
      break;

      case "CI": 
        errorMessageTranslated.title = 'Campos faltantes'
        errorMessageTranslated.content = 'Hay algún campo incompleto o con algún error'
      break;

      case "UE": 
        errorMessageTranslated.title = 'Nombre inválido'
        errorMessageTranslated.content = 'El nombre de usuario ya está en uso';
      break;

      case 'FF':
        errorMessageTranslated.title = 'Foto ausente'
        errorMessageTranslated.content = 'Hay que subir una foto';
        break;

      case 'FP':
        errorMessageTranslated.title = 'Perfil ausente';
        errorMessageTranslated.content = 'Hay que elegir el perfil'
        break;

      default:
        errorMessageTranslated.title = 'ERROR'
        errorMessageTranslated.content = 'Error inesperado';
      break;
    }

    return errorMessageTranslated;
  }

  /*
   case "auth/invalid-email": 
      this.GenerarAlerta("No tiene el formato email (ejemplo@gmail.com)","warning","EL IMAIL!!");
      break;

      case "auth/email-already-in-use": 
        this.GenerarAlerta("El mail ya existe","error","Lo sentimos");
      break;

      case "auth/weak-password": 
        this.GenerarAlerta("La contraseña debe de tener mas de 6 caracteres","warning","CONTRASEÑA INSEGURA!!");
      break;

      case "auth/missing-password": 
        this.GenerarAlerta("Falta la contraseña","warning","CUIDADO!!");
      break;

      case "auth/invalid-credential":
      case "auth/invalid-login-credentials": 
        this.GenerarAlerta("No existe ese ususario","error","Registrate!!");
      break;

      case "NV": 
        this.GenerarAlerta("Tienes que verificar el email","warning","EMAIL NO VERIFICADO!!");
      break;

      case "AD": 
        this.GenerarAlerta("Te tiene que habilitar el administrador","warning","Prohibido al entrada")
      break
      case "CI": 
        this.GenerarAlerta("Hay algun campo incompleto o con algún error","warning","CUIDADO!!");
      break;

      case "DE":
        this.GenerarAlerta("Un administrador te denego al entrada","error","DENEGADO!!");
      break;

      case "UE": 
      this.GenerarAlerta("El nombre de usuario ya existe","error","USUARIO REPETIDO!!");
      break;

      default:
        this.GenerarAlerta("Descuida no es tu culpa","error","ERROR NO REGISTRADO!!");
        console.log(codigoError);
      break;
    }
  }
  */
}
