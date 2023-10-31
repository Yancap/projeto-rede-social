import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  actualRoute!: string;
  constructor(
    private router: Router,
  ){}
  ngDoCheck() {
    this.actualRoute = this.router.url
  }
}
