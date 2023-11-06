import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PhotoComponent } from '../../components/photo/photo.component';
import { ModalPostComponent } from '../../components/modal-post/modal-post.component';
import { HttpClientModule } from '@angular/common/http';
import { WritePostComponent } from '../../components/write-post/write-post.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent, 
    PhotoComponent,
    ModalPostComponent,
    WritePostComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class HomeModule { 
  
 }
