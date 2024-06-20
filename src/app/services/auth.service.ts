import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { baseUserData, completeUserData, employe, userAccessData } from '../interfaces/user';
import { enumProfile } from '../enums/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData! : baseUserData;
  public isLogued : boolean;

   constructor(private auth : Auth) 
   { 
     this.isLogued = false;
   }
 
   /*
   Verlo luego
   */
   public logUserData(userLogedData : any)
   {
     this.userData = userLogedData;
     this.isLogued = true;
   }

   public register(userAccessData : userAccessData)
   {
      return createUserWithEmailAndPassword(this.auth, userAccessData.email, userAccessData.password)
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

   public changeCurrentUser(authUser : User, userData : any)
   {
    this.auth.updateCurrentUser(authUser);
    this.userData = userData;
   }

   public registerAnonymous() {
    return signInAnonymously(this.auth);
   }

   public onAuthStateAnonymous(){
      // return onAuthStateChanged(this.auth, (user) => {
      //   if(user){
      //     const uid = user.uid;
      //   }else{
      //     console.log("error, anonimos")
      //   }
      // });
   }
   /*
   public getProfileTransformed<T extends completeUserData | employe | anonimusClient>() : T
   {
      return <T><unknown>this.logedUserData.profile;
   }
    */
}
