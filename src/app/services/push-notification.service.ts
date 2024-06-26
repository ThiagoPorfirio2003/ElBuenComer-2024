import { Injectable, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { DataBaseService } from './data-base.service';
import { UtilsService } from './utils.service';
import { enumCollectionNames } from '../enums/collectionNames';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService  {

  /*constructor( private plt : Platform, private firebase : DataBaseService, private util : UtilsService) { }
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
      this.firebase.get(enumCollectionNames.Tokens,)

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


  //---------------------------------------------------------------------------

  private a()
  {
    const express = require("express");
    const bodyParser = require("body-parser");
    const admin = require("firebase-admin");
    const nodemailer = require("nodemailer");
    const dotenv = require("dotenv");

    dotenv.config();

    const serviceAccount = require(process.env['SERVICE_ACCOUNT']!);

    const app = express();
    const PORT = process.env['PORT'] || 3000;

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env['DATABASE_URL'],
    });

    const db = admin.firestore();

    app.use(bodyParser.json());

    // Endpoint para enviar una notificación a un usuario específico
    app.post("/notify", async (req : any, res : any) => {
      const { token, title, body } = req.body;

      const message = {
        notification: {
          title: title,
          body: body,
        },
        token: token,
      };

      try {
        const response = await admin.messaging().send(message);
        res.status(200).send(`Mensaje enviado correctamente: ${response}`);
      } catch (error) {
        res.status(500).send(`Error al enviar el mensaje: ${error}`);
      }
    });

    // Endpoint para enviar notificación a todos los empleados de un rol
    app.post("/notify-role", async (req : any, res : any) => {
      const { title, body, role } = req.body;

      try {
        const employeeTokens: any[]  = [];
        const querySnapshot = await db
          .collection("users")
          .where("role", "==", role)
          .get();
        querySnapshot.forEach((doc : any) => {
          const data = doc.data();
          if (data.token) {
            employeeTokens.push(data.token);
          }
        });

        if (employeeTokens.length === 0) {
          return res
            .status(404)
            .send("No hay usuarios a los que enviar un mensaje");
        }

        const message = {
          notification: {
            title: title,
            body: body,
          },
          tokens: employeeTokens,
        };

        const response = await admin.messaging().sendEachForMulticast(message);
        res.status(200).send(`Mensajes enviados: ${response.successCount}`);
      } catch (error) {
        res.status(500).send(`Error al enviar mensaje: ${error}`);
      }
    });

    // Endpoint para enviar un mail a un usuario
    app.post("/send-mail", async (req : any, res : any) => {
      try {
        const { aceptacion, nombreUsuario, mail } = req.body;
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env['MAIL'],
            pass: process.env['PASSWORD'],
          },
        });

        let resultado = await transporter.sendMail({
          from: '"Mi Comanda" <comandaferrero@gmail.com>',
          to: mail,
          subject: aceptacion
            ? "Felicitaciones su cuenta fue aceptada"
            : "Disculpe pero hemos bloqueado su cuenta",
          html: `
          <h1>${aceptacion ? "Felicitaciones " : "Disculpe "} ${nombreUsuario}</h1>
          <p>Su cuenta fue ${aceptacion ? "aceptada" : "rechazada"}</p>
          <p>Saludos La Comanda</p>
          `,
        });
        res.json({ ...resultado, seEnvio: true });
      } catch (e) {
        res.json({
          mensaje: "No se pudo enviar el mail",
          seEnvio: false,
        });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }*/


}
