import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { baseUserData, userAccessData } from 'src/app/interfaces/user';
import { UtilsService } from 'src/app/services/utils.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumProfile } from 'src/app/enums/profile';
import { enumClientState } from 'src/app/enums/clientState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private utiles: UtilsService,
    private fb: FormBuilder,
    private dataBaseService: DataBaseService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async login() {
    const loading = await this.utiles.getLoadingCtrl({ spinner: 'circular' });
    await loading.present();
    this.authService
      .logIn(this.getUserAccessData())
      .then((data) => {
        this.dataBaseService
          .getDocRef(enumCollectionNames.Users, data.user.uid)
          .then((doc) => {
            let userData = doc.data();
            loading.dismiss();
            if (userData) {
              this.redirectToHomePages(userData);
            } else {
              this.authService.logOut();
              let mensaje = this.utiles.translateAuthError('error inesperado');
              this.utiles.showSweet({
                titleText: mensaje.title,
                text: mensaje.content,
                icon: 'error',
              });
            }
          })
          .catch((error) => {
            loading.dismiss();
            let mensaje = this.utiles.translateAuthError(error.code);
            this.utiles.showSweet({
              titleText: mensaje.title,
              text: mensaje.content,
              icon: 'error',
            });
          });
      })
      .catch((error) => {
        loading.dismiss();
        let mensaje = this.utiles.translateAuthError(error.code);
        this.utiles.showSweet({
          titleText: mensaje.title,
          text: mensaje.content,
          icon: 'error',
        });
      });
  }

  getUserAccessData(): userAccessData {
    return {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!,
    };
  }

  loginDirect(email: string, password: string) {
    this.loginForm.setValue({ email, password });
  }

  redirectToPage() {
    this.loginForm.reset();
    this.utiles.changeRoute('/register-client');
  }

  redirectToHomePages(data: any) {
    const userProfile = data['profile'];
    switch (userProfile) {
      case enumProfile.Owner:
        console.log('User is an Owner');
        break;
      case enumProfile.Supervisor:
        console.log('User is a Supervisor');
        break;
      case enumProfile.Maitre:
        console.log('User is a Maitre');
        break;
      case enumProfile.Waiter:
        console.log('User is a Waiter');
        break;
      case enumProfile.Chef:
        console.log('User is a Chef');
        break;
      case enumProfile.Bartender:
        console.log('User is a Bartender');
        break;
      case enumProfile.Client:
        const state = data['state'];
        if(state == enumClientState.AwaitingApproval){
          let mensaje = this.utiles.translateAuthError("CE");
          this.utiles.showSweet({
            titleText: mensaje.title,
            text: mensaje.content,
            icon: 'error',
          });
        }else if(state == enumClientState.Rejected){
          let mensaje = this.utiles.translateAuthError("CR");
          this.utiles.showSweet({
            titleText: mensaje.title,
            text: mensaje.content,
            icon: 'error',
          });
        }else{
          this.utiles.changeRoute('/client-home')
        }
        break;
      case enumProfile.AnonimusClient:
        console.log('User is a anonimo');
        break;
    }
  }
}
