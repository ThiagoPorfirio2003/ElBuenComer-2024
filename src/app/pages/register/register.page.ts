
import { Component, OnInit } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumProfile } from 'src/app/enums/profile';
import { enumRegisters } from 'src/app/enums/register';
import { outPutResult } from 'src/app/interfaces/outPutResult';
import { baseUserData, completeUserData, userAccessData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage
{ 
  public registerToShow! : enumRegisters;
  public canShowRegister : boolean;
  private appState : any;

  constructor(private authService : AuthService,
    private utilsService : UtilsService,
    private dataBaseService : DataBaseService,
    private storageService : StorageService) 
  { 
    this.canShowRegister = false;
    this.appState = {
      route: this.utilsService.getRoute(), 
      authUser : this.authService.getAuthUser(),
      logedUserData : this.authService.logedUserData,
      //formValues : this.registerForm.value
      registerToShow : 0
    };
  }

  public showRegister(registerType : enumRegisters) 
  {
    this.registerToShow = registerType;
    this.canShowRegister = true;
  }

  public restoreAppState()
  {
    console.log(this.appState);
    this.authService.changeCurrentUser(this.appState.authUser, this.appState.logedUserData);
    this.utilsService.changeRoute(this.appState.route);
    this.registerToShow = this.appState.registerToShow;
    this.canShowRegister = true;
  }

  public async receiveAccessData(formData : outPutResult<any>)
  {
    const userData : baseUserData = formData.data.userData;
    const userAccessData : userAccessData = formData.data.userAccessData;
    const photo : Photo = formData.data.photo;
    const photoName : string = userData.name + '_' + Date.now() + '.' + photo.format;

    if(formData.status.success)
    {
      const loading = await this.utilsService.getLoadingCtrl({spinner: 'circular'});
      //const loginStatus : MyStatus = {message: {header:'ERROR'}, success: false};

      await loading.present();

      try
      {
        const userCredential = await this.authService.logIn(userAccessData);

        //const URL = await this.storageService.savePhoto(photo, photoName);

        if(userData.profile != enumProfile.Client)
        {

        }

        //(<completeUserData>userData).photoUrl = URL;

        //await this.dataBaseService.saveData()

        const doc = await this.dataBaseService.getDocRef(enumCollectionNames.Users, userCredential.user.uid);

      }
      catch(error : any)
      {          
        //loginStatus.message.header = this.utilsServices.translateAuthError(error.code);
      }
      finally
      {
        /*
        if(!loginStatus.success)
        {
          loading.dismiss();
          this.utilsServices.showSweet({title: loginStatus.message.header, text: loginStatus.message.content, background: '#C800FA',
            customClass: {title: 'primaryColor', confirmButton: 'sweetConfirm'}})
        }
        else
        {
          loading.dismiss();
        }
        */
      }
    }
    else
    {  
      /*
      this.utilsServices.showSweet({title: userAccessData.status.message.header, text: userAccessData.status.message.content, position: 'bottom', timer: 3000,
         showConfirmButton: false, customClass: 'toast', toast: true, timerProgressBar: true, background: '#2CCAAF'
      });
      */
    }
  }

  private baseProfileToSpecific()
  {
    
  }
}
