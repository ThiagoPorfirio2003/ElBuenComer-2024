import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, getDocs, orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { enumCollectionNames } from '../enums/collectionNames';
import { userImage } from '../interfaces/image';
import { baseUserData } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService 
{
  constructor(private firestore : Firestore) 
  {}

  public getObservable(collectionName : enumCollectionNames)
  {
    return collectionData(collection(this.firestore, collectionName));
  }

  public getCollectionRef(collectionName : enumCollectionNames)
  {
    return collection(this.firestore, collectionName);
  }

  public getUserByDNI(dni : string)
  {
    return getDocs(query(this.getCollectionRef(enumCollectionNames.Users), where('dni','==', dni)));
  }

  public getDocRef(collectionName : enumCollectionNames, idDoc : string)
  {
    return getDoc(doc(this.firestore, collectionName, idDoc));
  }

  public saveUser(nombreCollection : enumCollectionNames, user : any, uid : string)
  {
    setDoc(doc(this.firestore, nombreCollection, uid), user)

    return setDoc(doc(this.firestore, enumCollectionNames.Users, uid), user);
  }

  public saveImgData(collectionName : enumCollectionNames, img : userImage)
  {
    const docUserImg = doc(collection(this.firestore, enumCollectionNames.UserImages));

    img.id = docUserImg.id;

    setDoc(docUserImg, img)    

    return setDoc(doc(this.firestore, collectionName, img.id), img);
  }
}
