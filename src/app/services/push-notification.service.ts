import { Injectable, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { DataBaseService } from './data-base.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService implements OnInit {

  constructor( private plt : Platform, private firebase : DataBaseService, private util : UtilsService) { }
  ngOnInit(): void {
    if(this.plt.is('android')){
      this.AddListeners();
      this.RegisterNotification();
    }
  }

  async AddListeners()
  {
    await PushNotifications.addListener('registration', token => {
      let valorToken = token.value
      //chequear que exista el token, y sino guardarlo
      //this.firebase.getDocRef()

    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      this.util.SendPushNotification(notification.title!, notification.body!);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed ', notification.actionId,"    " ,notification.inputValue);

    });
  }

  async RegisterNotification()
  {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }
}
