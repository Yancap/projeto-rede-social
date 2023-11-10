import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { PersonMessageComponent } from '../../components/person-message/person-message.component';
import { MessageComponent } from '../../components/message/message.component';
import { LabelDataMessageComponent } from '../../components/message/label-data-message/label-data-message.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MessagesComponent,
    PersonMessageComponent,
    MessageComponent,
    LabelDataMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MessagesModule { }
