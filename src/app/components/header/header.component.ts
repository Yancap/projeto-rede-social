import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges{
  public activeRoute!: boolean;
  public userAvatar?: string | null;
  @Input() public avatarIsChanged: boolean = false;
  public toggleModalProfile: boolean = false;

  constructor(){ }

  ngOnInit(): void {
    this.userAvatar = sessionStorage.getItem('avatar')
  }
  ngOnChanges() {
    if(this.avatarIsChanged) {
      this.userAvatar = sessionStorage.getItem('avatar')
      this.avatarIsChanged = false;
    }
  }
  public openModal(){
    this.toggleModalProfile = !this.toggleModalProfile;
  }
}
