import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-graphic-comments',
  templateUrl: './graphic-comments.component.html',
  styleUrls: ['./graphic-comments.component.scss'],
})

export class GraphicCommentsComponent {
  buttonText: string = 'Comentarios';
  iconName: string = 'chatbox-ellipses-outline';
  public surveys: Array<any> = [];

  constructor( private modalController: ModalController,private firebase: DataBaseService ) {
    this.firebase.getObservable(enumCollectionNames.Surveys).subscribe((encuestas) => {
      this.surveys = [];
      this.surveys = encuestas;
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  toggleTextAndIcon() {
    if (this.buttonText === 'Comentarios') {
      this.buttonText = 'Gráficos';
      this.iconName = 'bar-chart-outline';
    } else {
      this.buttonText = 'Comentarios';
      this.iconName = 'chatbox-ellipses-outline';
    }
  }
}
