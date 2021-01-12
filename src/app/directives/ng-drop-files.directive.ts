import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItemModel } from '../models/file-item/file-item.model';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItemModel[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter;

  constructor() { }

  @HostListener('dragover',['$event'])

  public onDrag(event: any){
      this.mouseOver.emit( true );
    this._preventStop(event);

  }

  @HostListener('dragleave',['$event'])

  public onDragLeave(event: any){
      this.mouseOver.emit( false );
    }

  @HostListener('drop',['$event'])

  public onDrop(event: any){
    const transfer = this._getTransfer(event);
    
    if (!transfer) {
      return;
    }
    
    this._extractFiles(transfer.files);
    this._preventStop(event);
    this.mouseOver.emit( false );
  }

  private _getTransfer(event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList){
    // console.log(fileList);

    for (const property in Object.getOwnPropertyNames(fileList)) {
      const temporalFiles = fileList[property];

      if (this._fileCanBeUploaded(temporalFiles)) {
        const newFile = new FileItemModel(temporalFiles);
        this.files.push(newFile);
      }
    }
    console.log(this.files);
    
  }

  //Validaciones

  private _fileCanBeUploaded(archivo: File): boolean{
    if (!this._fileWasDropped(archivo.name) && this.isAnImage(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _preventStop( event ){
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileWasDropped(fileName: string): boolean{
    for (const archivo of this.files) {
      if (archivo.nombreArchivo === fileName) {
        console.log(`El Archivo ${archivo.nombreArchivo} ya  está agregado`);
        return true;
      }
    }
    return false;
  }

  private isAnImage(fileType: string): boolean{
    return (fileType === '' || fileType === undefined) ? false: fileType.startsWith('image');
  }

}
