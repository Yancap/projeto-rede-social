import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public activeRoute!: boolean;
  public userAvatar?: string | null;
  public toggleModalProfile: boolean = false;
  constructor(
    private router: Router,
  ){ }

  ngOnInit(): void {
    this.userAvatar = sessionStorage.getItem('avatar')
  }

  public openModal(){
    this.toggleModalProfile = !this.toggleModalProfile;
  }
}
