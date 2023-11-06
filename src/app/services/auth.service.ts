import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBody, RegisterBody, Users } from './auth.service.d'


@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private url = "http://localhost:3000/users";


  constructor(private http: HttpClient) { }


  async login({email, password}: LoginBody){
    let user: Users | undefined = {} as Users;
    const users = await (await fetch(this.url)).json()
    
    user = users.find((user: Users) => user.email === email && user.password === password)
    if(!user) {
      throw new Error("Invalid credentials")
    }

    return user
    
  }
  
  register({name, email, password, avatar}: RegisterBody){
    const user = this.http.post(this.url + "/register", {name, email, password, avatar}, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return user
  }
}