import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { PersonMessageComponent } from '../../components/person-message/person-message.component';



@NgModule({
  declarations: [
    MessagesComponent,
    PersonMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MessagesModule { }
