import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeAvatarService } from './components/change-avatar/change-avatar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  actualRoute!: string;
  avatarIsChanged: boolean = false;
  constructor(
    private router: Router,
    public changeAvatarService: ChangeAvatarService
  ){}
  ngDoCheck() {
    this.actualRoute = this.router.url
  }
  public setAvatarIsChanged(value: any) {
    this.avatarIsChanged = value;
  }
}
