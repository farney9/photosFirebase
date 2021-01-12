import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

// Components
import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';

// Services
import { UploadImagesService } from './services/upload-images.service';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';


@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    LoadComponent,
    NgDropFilesDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule
  ],
  providers: [
    UploadImagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
