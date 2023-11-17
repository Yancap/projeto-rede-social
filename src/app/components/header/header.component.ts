import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public activeRoute!: boolean;
  public userAvatar!: string | null;
  constructor(
    private router: Router,
  ){
    this.userAvatar = sessionStorage.getItem('avatar')
  }

  public logout(){
    sessionStorage.removeItem('avatar')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('user_tag')
    sessionStorage.removeItem('email')

    this.router.navigate(['login']);
  }
}
