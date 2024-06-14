import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

/**
 * Servicio para mostrar y gestionar cargadores (loaders).
 */
@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {
  private element: HTMLIonLoadingElement | null = null;
  constructor(private loadingController: LoadingController) {}

   private async createLoader(): Promise<HTMLIonLoadingElement> {
    const loader = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'dots',
      translucent: true,
      cssClass: 'custom-loading',
    });
    return loader;
  }

    /**
   * Muestra un cargador simple.
   * @returns Una promesa que se resuelve cuando el cargador se presenta.
   */
  async simpleLoader(): Promise<void> {
    const loader = await this.createLoader();
    await loader.present();
    this.element = loader;
  }

   /**
   * Descarta el cargador actual.
   * @returns Una promesa que se resuelve después de descartar el cargador.
   */
   async dismissLoader(): Promise<void> {
    if (this.element) {
      await this.element.dismiss();
      this.element = null;
    }
  }
}
