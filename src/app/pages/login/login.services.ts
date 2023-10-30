import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBody } from './login.services.d';


@Injectable({ providedIn: 'root' })
export class LoginHttpService {
  private url = "http://localhost:3333/";


  constructor(private http: HttpClient) { }


  login({email, password}: LoginBody): Observable<Object>{
    const user = this.http.post(this.url + "auth/login", {email, password})
    return user
  }
 
}
