import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions } from '@ionic/angular';
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { message } from '../interfaces/message';
import { LocalNotifications } from '@capacitor/local-notifications';

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
    options.heightAuto = false;
    return Swal.fire(options)
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

      case 'FFO':
        errorMessageTranslated.title = 'Foto ausente'
        errorMessageTranslated.content = '¿Seguro que no querés subir una? También podés hacerlo después';
        break;

    case 'FP':
      errorMessageTranslated.title = 'Perfil ausente';
      errorMessageTranslated.content = 'Hay que elegir el perfil'
      break;

    case 'PR':
      errorMessageTranslated.title = 'Persona Registrada';
      errorMessageTranslated.content = 'Esta persona ya esta registrada'
      break;

    case 'CuI':
      errorMessageTranslated.title = 'Cuil Invalido';
      errorMessageTranslated.content = 'El formato del cuil debe ser: 00-00000000-0'
      break;

    case 'CDNI':
      errorMessageTranslated.title = 'Cuil Invalido';
      errorMessageTranslated.content = 'El dni que ingreso no es el mimsmo que el del cuil'
      break;

      default:
        errorMessageTranslated.title = 'ERROR'
        errorMessageTranslated.content = 'Error inesperado';
      break;
    }

    return errorMessageTranslated;
  }

  SendPushNotification(titulo: string, descripcion : string)
  {
    LocalNotifications.schedule(
      {
        notifications: [
          {
            id: 1,
            title: titulo,
            body: descripcion
          }
        ]
      }
    )
  }
}
