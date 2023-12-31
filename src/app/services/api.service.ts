import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost, ResponsePosts } from './api.service.d';
import { delay, map, take, takeUntil, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = process.env['URL_SERVER_JSON'] + "post";

  constructor(private http: HttpClient) { }

  public getPost(page: number){
    return this.http.get<ResponsePosts[]>(this.url+`?_page=${page}&_limit=6`)
    .pipe(delay(1000), map( data => data.reverse()))
  }

  public createPost(post: CreatePost) {
    return this.http.post(this.url, post).pipe(delay(1000), take(1))
  }
}
