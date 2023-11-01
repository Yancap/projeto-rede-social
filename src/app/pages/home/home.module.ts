import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PhotoComponent } from '../../components/photo/photo.component';
import { ModalPostComponent } from '../../components/modal-post/modal-post.component';



@NgModule({
  declarations: [
    HomeComponent, 
    PhotoComponent,
    ModalPostComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
