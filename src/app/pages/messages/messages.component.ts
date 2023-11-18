import {
  Component,
  OnInit,
  OnDestroy,
  DoCheck,
  OnChanges,
  AfterContentChecked,
} from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { DataChatFormate, Users } from '../../services/messages';
import {
  Subscription,
  Observable,
  first,
  take,
  catchError,
  concatMap,
  switchMap,
} from 'rxjs';
import { UserChatInfoEmmiter } from 'src/app/components/person-message/models/user-chat-info-emmiter';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  public messages!: DataChatFormate[] | null;

  public keysTalks!: string[];
  public users!: Users[];
  public outDataMessage?: UserChatInfoEmmiter;

  public currentUser!: string | null;
  public inputMessage!: string;
  public messager$!: Observable<DataChatFormate[]>;
  public subscription?: Subscription;
  public key!: string | null;

  constructor(private messageService: MessagesService) {
    this.currentUser = sessionStorage.getItem('user_tag');
  }

  async ngOnInit() {
    this.keysTalks = await this.messageService.getKeysChatsFromTalk(
      this.currentUser as string
    );
    this.users = await this.messageService.getUsersForTalk(
      this.currentUser as string
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async onOutDataMessage(event: UserChatInfoEmmiter) {
    this.outDataMessage = event;
    this.key = await this.messageService.getUsersKeyChat(
      this.currentUser as string,
      event.user_tag
    );
    this.messages = null;

    if (this.key) {
      this.messager$ = this.messageService.getUserChatUsingTheKey(this.key);
      this.messager$.pipe(first()).subscribe({
        next: (data) => {
          this.messages = data;
        },
        error: (error) => error,
      });
    }
  }

  async handleSubmit() {
    if (this.key) {
      const dataMessager = {
        key: this.key,
        user_tag: this.currentUser as string,
        message: this.inputMessage,
      };
      try {
        this.messageService.sendMessages(dataMessager).subscribe();
      } catch (error) {
      } finally {
        this.subscription = this.messager$.subscribe(
          (data) => (this.messages = data)
        );
      }
      this.inputMessage = '';
      return;
    }

    if (this.currentUser && this.outDataMessage) {
      const newChatKey = this.currentUser + this.outDataMessage.user_tag;
      const dataMessager = {
        user_tag: this.currentUser as string,
        message: this.inputMessage,
      };
      try {
        this.messager$ = this.messageService.createNewChatAndSendMessager(
          {
            key: newChatKey,
            users_tags: [this.currentUser, this.outDataMessage.user_tag],
          },
          dataMessager
        );

        this.subscription = this.messager$.subscribe(
          data => this.messages = data
        );
      } catch (error) {}

      this.inputMessage = '';
      return;
    }
  }
}
