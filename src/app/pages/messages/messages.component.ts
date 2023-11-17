import { Component, OnInit, OnDestroy, DoCheck, OnChanges, AfterContentChecked } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { DataChatFormate, Users } from '../../services/messages';
import { Subscription, Observable, first, take } from 'rxjs';
import { UserChatInfoEmmiter } from 'src/app/components/person-message/models/user-chat-info-emmiter';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  public messages!: DataChatFormate[]

  public keysTalks!: string[];
  public users!: Users[];
  public outDataMessage!: UserChatInfoEmmiter

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
    this.keysTalks = (await this.messageService.getKeysChatsFromTalk(this.currentUser as string));
    this.users = await this.messageService.getUsersFromTalk(this.keysTalks);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  async onOutDataMessage(event: UserChatInfoEmmiter){
    this.outDataMessage = event
    this.key = await this.messageService.getUsersKeyChat(this.currentUser as string, event.user_tag)

    this.messager$ = this.messageService.getUserChatUsingTheKey(this.key)
    this.messager$.pipe(first()).subscribe(data => this.messages = data)
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
