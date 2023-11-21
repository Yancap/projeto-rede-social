import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss']
})
export class ModalProfileComponent {
  constructor(
    private router: Router,
  ){ }

  public logout(){
    sessionStorage.removeItem('avatar')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('user_tag')
    sessionStorage.removeItem('email')

    this.router.navigate(['login']);
  }
}
