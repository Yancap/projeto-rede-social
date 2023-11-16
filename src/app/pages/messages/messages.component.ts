import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { DataChatFormate, Users } from '../../services/messages';
import { Subscription, Observable, first, take } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  public messages!: DataChatFormate[]

  public keysTalks!: string;
  public users!: Users[];

  public currentUser!: string | null;
  public inputMessage!: string;
  public messager$!: Observable<DataChatFormate[]>;
  public subscription!: Subscription;
  public key!: string;

  constructor(
    private messageService: MessagesService
  ){
    this.currentUser = sessionStorage.getItem('user_tag')
  }

  async ngOnInit() {
    this.keysTalks = (await this.messageService.getKeysChatsFromTalk(this.currentUser as string)).join(" ");
    this.users = await this.messageService.getUsersFromTalk(this.keysTalks);
    console.log(this.users);
    
    this.key = await this.messageService.getUsersKeyChat("@yan", "@john")
    
    this.messager$ = this.messageService.getUserChatUsingTheKey(this.key)
    this.messager$.pipe(first()).subscribe(data => this.messages = data)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  handleSubmit(){
    const dataMessager = {
      key: this.key,
      user_tag: this.currentUser as string,
      message: this.inputMessage
    }
    try {
      this.messageService.sendMessages(dataMessager)
    } catch (error) { } finally {
      this.subscription = this.messager$.subscribe(data => this.messages = data)
    }
  }
}
