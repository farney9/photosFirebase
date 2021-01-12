
export class FileItemModel {

  public archivo: File;
  public nombreArchivo: string;
  public url: string;
  public isLoading: boolean;
  public progress: number;

  constructor( file: File) {
    this.archivo = file;
    this.nombreArchivo = this.archivo.name;
    this.isLoading = false;
    this.progress = 25;
   }

}
