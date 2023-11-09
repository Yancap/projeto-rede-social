import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private authService: AuthHttpService
  ) {}

  public error = {
    exist: false,
    type: "",
    message: ""
  }

  public register: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: string | ArrayBuffer | null
  } = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null
  }

  async handleSubmit(){
    this.error = {
      exist: false,
      type: "",
      message: ""
    }
    if(this.register.password !== this.register.confirmPassword) {
      this.error.exist = true;
      this.error.type = "PasswordNotEquals";
      this.error.message = "Senhas Diferentes"
      return;
    }

    try {
      await this.authService.register(this.register)
    } catch (error) {
      if(error instanceof Error) {
        this.error = {
          exist: true,
          message: error.message,
          type: "EmailAlreadyExist"
        }
      }
    }
    return this.router.navigate(['/login'])
  }

  handleAvatar(event: any | InputEvent){
    if(event.target) {
      let reader = new FileReader();
      reader.onload = () => {
          this.register.avatar = reader.result
      }
      if(event.target.files) {
        try{
          reader.readAsDataURL(event.target.files[0]);
        } catch { }
      }
    }
  }

  deleteAvatar(){
    this.register.avatar = null;
   }
   
  navigate(path: string) {
    this.router.navigate([path])
  }
}
