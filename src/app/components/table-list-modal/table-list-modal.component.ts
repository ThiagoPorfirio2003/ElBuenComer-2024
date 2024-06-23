import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { Table } from 'src/app/interfaces/table';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-table-list-modal',
  templateUrl: './table-list-modal.component.html',
  styleUrls: ['./table-list-modal.component.scss'],
})
export class TableListModalComponent implements OnInit {
  @Input() tables!: Table[];
  @Input() client!: any;

  constructor(
    private modalController: ModalController,
    private util: UtilsService,
    private firebase: DataBaseService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  assignTable(table: Table) {
    this.util
      .showSweet({
        title: 'Asignación de Mesa',
        text: '¿Desea confirmar la asignación de la mesa ' + table.number + ' al cliente ' + this.client.name + '?',
        showCancelButton: true,
        cancelButtonText: 'No, cambie de opinión',
        confirmButtonText: 'Estoy seguro',
      })
      .then(async(result) => {
        if (result.isConfirmed) {
          const loading = await this.util.getLoadingCtrl({spinner: 'circular'});
          await loading.present();
          this.firebase.updateTableCurrentClient(this.client.id,table.number.toString()).then(() => {
            this.firebase.deleteData(enumCollectionNames.WaitingRoom, this.client.id);
            loading.dismiss();
            this.modalController.dismiss();
          }).catch((error)=>{
            let mensaje = this.util.translateAuthError(error.code);
            this.util.showSweet({titleText:mensaje.title,text:mensaje.content,icon:"error"});
          });
        }
      });
  }
}
