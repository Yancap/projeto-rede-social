import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost, ResponsePosts } from './api.service.d';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = "http://localhost:3000/posts";

  constructor(private http: HttpClient) { }

  public getPost(page: number){
    return this.http.get<ResponsePosts[]>(this.url+`?_page=${page}&_limit=6`)
    .pipe(delay(1000))
  }

  public createPost(post: CreatePost) {
    return this.http.post(this.url, post)
  }
}
