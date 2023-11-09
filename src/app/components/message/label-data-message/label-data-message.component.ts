import { Component, Input } from '@angular/core';

@Component({
  selector: 'label-data-message',
  templateUrl: './label-data-message.component.html',
  styleUrls: ['./label-data-message.component.scss']
})
export class LabelDataMessageComponent {
  @Input() date!: string;
}
