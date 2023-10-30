import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHttpService } from './login.services';
import { AuthHttpService } from './../../services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authHttpService: AuthHttpService
  ) {}
  public password: string = "";
  public email: string = "";
  public response: object = {};
  public async handleSubmit () {
    this.authHttpService.login({
      email: this.email, 
      password: this.password
    }).subscribe(data => this.response = data)
    console.log(this.response);
    
    
  }

  navigate(path: string) {
    this.router.navigate([path])
  }
}
