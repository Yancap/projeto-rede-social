import { ResolveFn } from '@angular/router';
import { ApiService } from './../services/api.service';
import { ResponsePosts } from '../services/api.service.d';
import { Observable, delay } from 'rxjs';
import { inject } from '@angular/core';

export const postsResolver: ResolveFn<Observable<ResponsePosts[]>> = (route, state) => {
  const service = inject(ApiService)
  return service.getPost(1).pipe(delay(1000))
};
