import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { baseUserData, client, completeUserData, employe, userAccessData } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user! : any;
  public isLogued : boolean;

   constructor(private auth : Auth) 
   { 
     this.isLogued = false;
   }
 
   public logMyUser(userLoged : any)
   {
     this.user = userLoged;
     this.isLogued = true;
   }
 
   public logIn(userAccessData : userAccessData)
   {
     return signInWithEmailAndPassword(this.auth, userAccessData.email, userAccessData.password);
   }     

   public getAuthUser()
   {
     return this.auth.currentUser;
   }
 
   public logOut()
   {
     this.isLogued = false;
     return signOut(this.auth);
   }

   public changeCurrentUser(authUser : User, myUser : any)
   {
    this.auth.updateCurrentUser(authUser);
    this.user = myUser;
   }

   public getUser<T extends employe | client<baseUserData | completeUserData>>() : T
   {
      return this.user as T
   }
}
