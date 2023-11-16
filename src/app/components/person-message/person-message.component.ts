import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() onIndex: EventEmitter<{ index: number; user_tag: string }> = new EventEmitter();
  public handleClick(){
    if (this.user_tag && this.index) {
      this.onIndex.emit({
        index: this.index,
        user_tag: this.user_tag,
      })
    }
  }
}
