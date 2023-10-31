import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PhotoComponent } from '../../components/photo/photo.component';



@NgModule({
  declarations: [
    HomeComponent, 
    PhotoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
