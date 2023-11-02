import { Component, Input } from '@angular/core';

@Component({
  selector: 'person-message',
  templateUrl: './person-message.component.html',
  styleUrls: ['./person-message.component.scss']
})
export class PersonMessageComponent {
  @Input() avatar!: string;
  @Input() name!: string;
  @Input() email?: string;
}
