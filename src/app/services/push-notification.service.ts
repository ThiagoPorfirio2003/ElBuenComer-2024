import { Injectable, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { DataBaseService } from './data-base.service';
import { UtilsService } from './utils.service';
import { enumCollectionNames } from '../enums/collectionNames';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService  {

constructor( private plt : Platform, private firebase : DataBaseService, private util : UtilsService) { }
  ngOnInit(): void {
    if(this.plt.is('android')){
      this.AddListeners();
      this.RegisterNotification();
    }
  }

  async AddListeners()
  {
    /*wait PushNotifications.addListener('registration', token => {

    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      this.util.SendPushNotification(notification.title!, notification.body!);
    });*/
  
    await LocalNotifications.addListener('localNotificationReceived', notification => {
      console.log('Push notification action performed ', notification);

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
