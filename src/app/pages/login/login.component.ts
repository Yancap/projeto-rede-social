import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '../../services/auth.service';
import { Users } from '../../services/auth.service.d';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authHttpService: AuthHttpService
  ) {}
  public password: string = '';
  public email: string = '';
  public user: Users = { } as Users;
  public error!: string | undefined;

  public async handleSubmit() {
    try {
      this.user = await this.authHttpService.login({
        email: this.email,
        password: this.password,
      })
    } catch (error) {
      if(error instanceof Error) {
        this.error = error.message
      }
    }
    
    sessionStorage.setItem('name', this.user.name)
    sessionStorage.setItem('user_tag', this.user.user_tag)
    sessionStorage.setItem('email', this.user.email)

    this.navigate("home")
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
