import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions } from '@ionic/angular';
import Swal, { SweetAlertOptions } from 'sweetalert2'


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

  public translateAuthError(errorMessage : string) : string
  {
    let errorMessageTranslated! : string;
    
    switch(errorMessage)
    {
      case "auth/invalid-email": 
        errorMessageTranslated = "El mail no cumple con el siguiente formato (ejemplo@gmail.com)";
      break;

      case "auth/email-already-in-use": 
        errorMessageTranslated = "El mail ya pertenece a otro usuario";
      break;

      case "auth/weak-password":       
        errorMessageTranslated = "La clave debe de tener mas de 6 caracteres";
      break;

      case "auth/missing-password": 
        errorMessageTranslated = "No se ingreso la clave";
      break;

      case "auth/invalid-credential":
      case "auth/invalid-login-credentials":  
        errorMessageTranslated = "Los datos no pertenecen ningun usuario";
        break;

      case "auth/email-already-in-use": 
        errorMessageTranslated = 'El mail ya está registrado';
        break;

      case "CE":
        errorMessageTranslated = 'La cuenta esta en espera de aprobación'
        break;

      case "NV": 
        errorMessageTranslated = 'La cuenta no está verificada'
      break;

      case "NH":
        errorMessageTranslated = 'La cuenta no está habilitada'
      break;

      case "CI": 
        errorMessageTranslated = 'Hay algún campo incompleto o con algún error'
      break;

      case "UE": 
        errorMessageTranslated = 'El nombre de usuario ya está en uso';
      break;

      case 'FF':
        errorMessageTranslated = 'El nombre de usuario ya está en uso';
        break;

      default:
        errorMessageTranslated = 'Error inesperado';
      break;
    }

    return errorMessageTranslated;
  }
}
