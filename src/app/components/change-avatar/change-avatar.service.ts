import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeAvatarService {
  public isOpen = true;
  constructor() { }

  public toggle() {
    this.isOpen = !this.isOpen;
  }
}
