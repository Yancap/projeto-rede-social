import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public activeRoute!: boolean;
  constructor(
    private router: Router,
  ){}

  public logout(){
    this.router.navigate(['/login']);
  }
}
