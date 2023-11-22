import { Component } from '@angular/core';
import { ChangeAvatarService } from './change-avatar.service';

@Component({
  selector: 'change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent {
  constructor(
    public service: ChangeAvatarService
  ) {}

  public closeModal(event: MouseEvent, element: any){
    if(event.target === element) {
      this.service.toggle()
    }
  }
}
