import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, StorageReference, uploadBytes } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { enumStoragePaths } from '../enums/storagePaths';
import IImagen from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly IMGS_PATH : string = 'img/';

  constructor(private storage : Storage) 
  {
    
  }          

  public async savePhoto(photo : Photo, storagePath : enumStoragePaths, name : string) : Promise<string>
  {
    let imgRef : StorageReference;
    let error : any;
    let photoUrl : string;

    error = undefined;

    imgRef = ref(this.storage, this.IMGS_PATH + storagePath + name)

    try
    {
      //await uploadBytes(imgRef, this.base64ToBlob(photo.base64String!, photo.format));
      await uploadBytes(imgRef, this.dataURLToBlob(photo.dataUrl!));
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
  
  async uploadImageAndGetURL(imageObject: IImagen, storagePath : enumStoragePaths) {
    try {
      const imageBlob = await fetch(imageObject.img).then((response) => response.blob());
      const imgRef = ref(this.storage, this.IMGS_PATH + storagePath + imageObject.name);
      await uploadBytes(imgRef, imageBlob);
      return getDownloadURL(imgRef);
    } catch (error: any) {
      throw new Error('Error al cargar la imagen: ' + error.message);
    }
  }

  //public savePhotos

  /*
  private base64ToBlob(base64String: string, extension : string): Blob 
  {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/' + extension });
  }*/

  private dataURLToBlob(dataURL: string): Blob 
  {
    const [header, base64String] = dataURL.split(',');
    const mimeString = header.match(/:(.*?);/)![1];

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeString });
  }
}
