import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBody, RegisterBody } from './auth.service.d'


@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private url = "http://localhost:3333/auth";


  constructor(private http: HttpClient) { }


  login({email, password}: LoginBody): Observable<Object>{
    const user = this.http.post(this.url + "/login", {email, password})
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