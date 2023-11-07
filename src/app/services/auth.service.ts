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
  
  register({name, email, password, avatar}: RegisterBody){
    return this.http.post(this.url + "/register", {name, email, password, avatar}, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
     
  }
}