import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileItemModel } from '../models/file-item/file-item.model';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private IMAGE_FOLDER = "images"

  constructor( private db: AngularFirestore,
               private storage: AngularFireStorage) { }

  uploadImagesToFirebaseService(images: FileItemModel[]): void{
    for (const item of images) {
 
      item.isLoading = true;
      if ( item.progress >= 100 ) {
        continue;
      }
 
      const file = item.archivo;
      const filePath = `${ this.IMAGE_FOLDER }/${ item.nombreArchivo }`;
      const fileRef = this.storage.ref( filePath );
      const uploadTask = this.storage.upload(filePath, file);
 
      // con esta función nos suscribimos a los cambios en el progreso
      uploadTask.percentageChanges().subscribe( resp => item.progress = resp);
      // obtengo el url de descarga cuando este disponible
      uploadTask.snapshotChanges().pipe(
        finalize(
          () => fileRef.getDownloadURL().subscribe( url => {
            console.log('Imagen cargada con exito');
            item.url = url;
            item.isLoading = false;
            this.saveImages({
              name: item.nombreArchivo,
              url: item.url
            });
          })
        )
      ).subscribe();
    }
    
  }


  private saveImages( image: {name: string, url: string}){
  
    this.db.collection(`/${ this.IMAGE_FOLDER}`)
            .add(image);
  
  }

}
