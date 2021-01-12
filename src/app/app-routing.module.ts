import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';

export const routes: Routes = [
  { path: 'photos', component: PhotosComponent},
  { path: 'load', component: LoadComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'photos'}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
