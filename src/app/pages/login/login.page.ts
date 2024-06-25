import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { userAccessData } from 'src/app/interfaces/user';
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
            this.loginForm.reset();
            if (userData) {
              this.authService.logUserData(userData);
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
        this.utiles.changeRoute('/listado-clientes');
        break;
      case enumProfile.Supervisor:
        this.utiles.changeRoute('/listado-clientes');
        break;
      case enumProfile.Maitre:
        this.utiles.changeRoute('/maitre-home');
        break;
      case enumProfile.Waiter:
        console.log('User is a Waiter');
        break;
      case enumProfile.Chef:
        this.utiles.changeRoute('/chef-home');
        break;
      case enumProfile.Bartender:
        this.utiles.changeRoute('/bartender-home');
        break;
      case enumProfile.Client:
        const state = data['state'];
        if(state == enumClientState.AwaitingApproval){
          let mensaje = this.utiles.translateAuthError("CE");
          this.utiles.showSweet({
            titleText: mensaje.title,
            text: mensaje.content,
            icon: 'warning',
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
    }
  }
}
