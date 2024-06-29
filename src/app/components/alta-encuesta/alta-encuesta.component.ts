import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumCustomerServiceQuality } from 'src/app/enums/customerServiceQuality';
import { enumFoodTemperature } from 'src/app/enums/foodTemperature';
import { enumLikedAspects } from 'src/app/enums/likedAspects';
import { qualitySurvey } from 'src/app/interfaces/survey';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-alta-encuesta',
  templateUrl: './alta-encuesta.component.html',
  styleUrls: ['./alta-encuesta.component.scss'],
})
export class AltaEncuestaComponent  implements OnInit 
{
  @Output() newItemEvent = new EventEmitter<boolean>(); 
  public encuesta : qualitySurvey = {} as qualitySurvey;

  constructor(private firebase : DataBaseService, private util : UtilsService) {
    this.encuesta.customerService = enumCustomerServiceQuality.Decent;
    this.encuesta.mostLikedAspects = [];
    this.encuesta.foodTemperature = enumFoodTemperature.Correct;
    this.encuesta.overallQuality = 5;
    this.encuesta.comment = "";
  }

  ngOnInit() {}

  handleChange(ev : any ) 
  {
    this.encuesta.customerService = ev.target.value;
  }
  handleRage(ev : any ) 
  {
    this.encuesta.overallQuality = ev.target.value;
  }

  ChechBoxEvent(numero : enumLikedAspects) 
  {

    if(this.encuesta.mostLikedAspects.includes(numero))
    {
      this.encuesta.mostLikedAspects = this.encuesta.mostLikedAspects.filter(element => element != numero);
    }
    else
    {
      this.encuesta.mostLikedAspects.push(numero);
    }
  }

  Select(ev : any)
  {
    this.encuesta.foodTemperature = ev.target.value;
  }

  async Enviar()
  {
    this.util.showSweet({title: "Encuesta", text: "Estas seguro de enviar esta encuesta?", showCancelButton: true,
      cancelButtonText:"No, cambie de opinión", confirmButtonText: "Estoy seguro" })
    .then(async (result)=>
    {
      if(result.isConfirmed)
      {
        let louding = await this.util.getLoadingCtrl({spinner: "circular"});
        louding.present();
        this.firebase.saveData(enumCollectionNames.Surveys, this.encuesta)
        .then(()=>{
          this.util.showSweet({title: "Encuesta", text: "Su respuesta ha sido guardada correctamente", icon: "success", confirmButtonText:"Aceptar" })
          this.newItemEvent.emit(true);
          louding.dismiss();
        })
        .catch((error)=>{
          let mensaje = this.util.translateAuthError(error.code);
          this.util.showSweet({
            titleText: mensaje.title,
            text: mensaje.content,
            icon: 'error',
          });
          louding.dismiss();
        })
      }
    })
  }

}
