import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '../../services/auth.service';
import { Users } from '../../services/auth.service.d';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy{
  constructor(
    private router: Router,
    private authHttpService: AuthHttpService
  ) {}
  public password: string = '';
  public email: string = '';
  public user: Users = { } as Users;
  public error!: string | undefined;
  public subs!: Subscription;

  ngOnDestroy(): void {
      this.subs.unsubscribe()
  }  

  public handleSubmit() {
    
    this.subs = this.authHttpService.login({
      email: this.email,
      password: this.password,
    }).subscribe(data => {
      if(!data) return this.error = "Invalid credentials"
      this.user = data
      sessionStorage.setItem('name', this.user.name)
      sessionStorage.setItem('user_tag', this.user.user_tag)
      sessionStorage.setItem('email', this.user.email)

      this.navigate("home")
      return data
    })
    
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
