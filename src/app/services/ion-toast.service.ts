import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
/**
 * Servicio para mostrar toasts de errores y éxitos.
 */
@Injectable({
  providedIn: 'root'
})
export class IonToastService {

  constructor(private toast: ToastController) { }

   /**
   * Muestra un toast de error.
   * @param message - El mensaje de error a mostrar.
   */
   showToastError(message: string) {
    this.toast
      .create({
        message,
        duration: 3000,
        color: 'danger',
      })
      .then((toastData) => {
        toastData.present();
      });
  }

   /**
   * Muestra un toast de éxito.
   * @param message - El mensaje de éxito a mostrar.
   */
  showToastSuccess(message: string) {
    this.toast
      .create({
        message,
        duration: 3000,
        color: 'success',
      })
      .then((toastData) => {
        toastData.present();
      });
  }
}
