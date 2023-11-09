import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, find, map } from 'rxjs';
import { LoginBody, RegisterBody, Users } from './auth.service.d'


@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private url = "http://localhost:3000/users";


  constructor(private http: HttpClient) { }


  login({email, password}: LoginBody){
    return this.http.get<Users[]>(this.url)
    .pipe(map(user => {
      return user.find(u => u.email === email && u.password === password)
    }))
  }
  
  async register({name, email, password, avatar}: RegisterBody){
    const users: Users[] = await (await fetch(this.url)).json()

    if(users.some((user) => user.email === email)) throw new Error("Email já cadastrado")
    const user_tag = "@" + email.split("@")[0]
    return this.http.post(this.url, {name, email, password, avatar, user_tag}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe().unsubscribe()
     
  }
}