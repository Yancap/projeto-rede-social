import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { Users } from 'src/app/services/auth.service.d';

@Injectable({
  providedIn: 'root',
})
export class ChangeAvatarService {
  public isOpen = false;
  private url = process.env['URL_SERVER_JSON'] + 'users/avatar';
  constructor(private http: HttpClient) {}

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  public updateAvatar(data: {avatar: string | ArrayBuffer, user_tag: string}) {
    return this.http.put<Users>(this.url, data).pipe(take(1))
  }
}
