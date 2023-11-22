import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeAvatarService } from '../change-avatar/change-avatar.service';

@Component({
  selector: 'modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss']
})
export class ModalProfileComponent {
  constructor(
    private router: Router,
    public changeAvatarService: ChangeAvatarService
  ){ }

  public logout(){
    sessionStorage.removeItem('avatar')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('user_tag')
    sessionStorage.removeItem('email')

    this.router.navigate(['login']);
  }
}
