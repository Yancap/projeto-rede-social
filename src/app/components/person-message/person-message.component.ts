import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserChatInfoEmmiter } from './models/user-chat-info-emmiter';

@Component({
  selector: 'person-message',
  templateUrl: './person-message.component.html',
  styleUrls: ['./person-message.component.scss']
})
export class PersonMessageComponent {
  @Input() class!: string;
  @Input() avatar!: string;
  @Input() name!: string;
  @Input() user_tag?: string;
  @Input() index?: number;

  @Output() onIndex: EventEmitter<UserChatInfoEmmiter> = new EventEmitter();
  public handleClick(){
    if (this.user_tag && this.index !== undefined) {
      this.onIndex.emit({
        index: this.index,
        user_tag: this.user_tag,
        name: this.name,
        avatar: this.avatar
      })
    }
  }
}
