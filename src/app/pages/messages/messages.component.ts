import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
 constructor(
  private messageService: MessagesService
 ){}

 async ngOnInit() {
  const data = await this.messageService.getUserChatUsingTheKey("@yan", "@john")
  console.log(data);
  
 }
}
