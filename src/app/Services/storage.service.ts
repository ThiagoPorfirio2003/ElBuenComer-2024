import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, StorageReference, uploadBytes } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly IMGS_PATH : string = 'img/';

  constructor(private storage : Storage) 
  {}          

  public async savePhoto(photo : Photo, name : string) : Promise<string>
  {
    let imgRef : StorageReference;
    let error : any;
    let photoUrl : string;

    error = undefined;

    imgRef = ref(this.storage, this.IMGS_PATH + name)

    try
    {
      await uploadBytes(imgRef, this.base64ToBlob(photo.base64String!, photo.format));
      photoUrl = await getDownloadURL(imgRef)
    }
    catch(e)
    {
      error = e;
    }

    return new Promise((resolve, reject)=>
    {
      if(error)
      {
        reject(error)
      }
      else
      {
        resolve(photoUrl);
      }
    });
  }

  //public savePhotos

  private base64ToBlob(base64String: string, extension : string): Blob 
  {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/' + extension });
  }
}
