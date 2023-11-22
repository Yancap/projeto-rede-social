import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public activeRoute!: boolean;
  public userAvatar?: string | null;
  public toggleModalProfile: boolean = false;

  constructor(){ }

  ngOnInit(): void {
    this.userAvatar = sessionStorage.getItem('avatar')
  }

  public openModal(){
    this.toggleModalProfile = !this.toggleModalProfile;
  }
}
