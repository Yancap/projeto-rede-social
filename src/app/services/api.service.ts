import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsePosts } from './api.service.d';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = "https://jsonplaceholder.typicode.com/";
  private post!: ResponsePosts[];

  constructor(private http: HttpClient) { }

  public async getPost(){
    this.http.get<ResponsePosts[]>(this.url + "posts")
    .subscribe(data => {
      this.post = data
    });
    console.log(this.post);
  }

}
