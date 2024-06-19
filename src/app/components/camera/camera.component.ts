import { Component, Input, OnInit } from '@angular/core';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IImagen } from 'src/app/interfaces/image';
import { IonToastService } from 'src/app/services/ion-toast.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent  implements OnInit {

  @Input() imageObject!: IImagen;

  constructor(private ionToastService: IonToastService) {}

  ngOnInit() {}

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      const imageUri = image.webPath;
      if (imageUri) {
        const imageName = new Date().getTime() + '.jpg';
        this.imageObject = {
          img: imageUri,
          name: imageName,
          exist: true,
        };
      }
    } catch (error) {
      const message = 'Se canceló la captura de la foto';
      this.ionToastService.showToastError(message);
    }
  }

}
