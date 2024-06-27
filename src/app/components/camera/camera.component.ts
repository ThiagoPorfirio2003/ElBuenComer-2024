import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import IImagen from 'src/app/interfaces/image';
import { AuthService } from 'src/app/services/auth.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  @Input() imageObject!: IImagen;
  @Output() capturarImg = new EventEmitter<IImagen>();
  @Input() registerForm!: FormGroup;
  @Output() carturaForm = new EventEmitter<FormGroup>();

  private appStateBeforeCamera : any;

  constructor(private ionToastService: IonToastService, private utilsService: UtilsService, private authService: AuthService) {}

  async takePhoto() {
    try {
      this.saveAppState();
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      this.restoreAppState()
      const imageUri = image.webPath;
      if (imageUri) {
        const imageName = new Date().getTime().toString();
        const newImageObject = {
          img: imageUri,
          name: imageName,
          exist: true,
        };
        this.capturarImg.emit(newImageObject)
      }
    } catch (error) {
      const message = 'Se canceló la captura de la foto';
      this.ionToastService.showToastError(message);
    }
  }
  
  private saveAppState() {
    this.appStateBeforeCamera = {
      route: this.utilsService.getRoute(),
      formValues : this.registerForm.value
    };
  }

  private restoreAppState()
  {
    this.utilsService.changeRoute(this.appStateBeforeCamera.route);
    this.registerForm.setValue(this.appStateBeforeCamera.formValues);
    this.carturaForm.emit(this.registerForm)
  }
}
