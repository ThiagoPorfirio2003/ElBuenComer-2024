import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage{

  public headerClass : string;
  public centerClass : string;
  public footerClass : string;

  constructor(private utilsService : UtilsService,
    private platform : Platform)
    {
      this.headerClass = 'scale-out-hor-left';
      this.centerClass = 'scale-out-horizontal';
      this.footerClass = 'scale-out-hor-right';
    }


    ionViewDidEnter()
    {
      if(!this.utilsService.splashScreenHasShown)
        {
          this.platform.ready().then(() => 
          {
            this.utilsService.splashScreenHasShown = true;
            SplashScreen.hide().then(()=>
            {
              setTimeout(()=>
              {
                this.headerClass = 'slide-in-right';
                this.centerClass = 'slide-in-left';
                this.footerClass = 'slide-in-bottom';
              }, 2700)

              setTimeout(() => 
              {
                 this.utilsService.changeRoute('/login')
              }, 4500);
            })
          });
        }
    }  
}
