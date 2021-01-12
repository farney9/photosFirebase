import { Component, OnInit } from '@angular/core';
import { FileItemModel } from 'src/app/models/file-item/file-item.model';
import { UploadImagesService } from 'src/app/services/upload-images.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [
  ]
})
export class LoadComponent implements OnInit {

  isHoverDropZone: false;

  files: FileItemModel[] = [];

  constructor( public _uploadImages: UploadImagesService ) { }

  ngOnInit(): void {
  }

  uploadImages(){
    this._uploadImages.uploadImagesToFirebaseService(this.files);
  }

  clearFiles(){
    this.files = [];
  }



}
