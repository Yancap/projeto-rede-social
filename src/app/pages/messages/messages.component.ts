import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { DataChatFormate } from '../../services/messages';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  public messages!: DataChatFormate[]
  public currentUser!: string | null;
  public inputMessage!: string;
  public messager$!: Subscription;
  public key!: string;

  constructor(
    private messageService: MessagesService
  ){
    this.currentUser = sessionStorage.getItem('user_tag')
  }

  async ngOnInit() {
    this.key = await this.messageService.getUsersKeyChat("@yan", "@john")
    this.messager$ = this.messageService.getUserChatUsingTheKey(this.key)
    .subscribe( data => this.messages = data )
  }
  ngOnDestroy(){
    this.messager$.unsubscribe()
  }

  handleSubmit(){

  }
}
