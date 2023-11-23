import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChangeAvatarService } from './change-avatar.service';
import { catchError } from 'rxjs';
import { Users } from 'src/app/services/auth.service.d';

@Component({
  selector: 'change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss'],
})
export class ChangeAvatarComponent implements OnInit, OnDestroy{
  public photo?: string | ArrayBuffer | null;
  public handleError: string | undefined | null;
  public handleSuccess!: boolean;
  @Output() avatarChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(public service: ChangeAvatarService) {}

  ngOnInit(): void {
    this.photo = sessionStorage.getItem('avatar');
  }

  ngOnDestroy(): void {
    this.handleError = null;
    this.handleSuccess = false;
  }
  public closeModal(event: MouseEvent, element: any) {
    if (event.target === element) {
      this.service.toggle();
    }
  }

  handleAvatar(event: any | InputEvent) {
    this.handleError = null;
    this.handleSuccess = false;
    if (event.target) {
      let reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result;
      };
      if (event.target.files) {
        try {
          reader.readAsDataURL(event.target.files[0]);
        } catch {}
      }
    }
  }

  deleteAvatar() {
    this.handleSuccess = false;
    this.handleError = null;
    this.photo = null;
  }

  handleSubmit() {
    this.handleError = null;
    this.handleSuccess = false;
    const user_tag = sessionStorage.getItem('user_tag');
    if (user_tag && this.photo) {
      this.service
        .updateAvatar({ avatar: this.photo, user_tag: user_tag })
        .subscribe(
          {
            next: data => {
              sessionStorage.setItem('avatar', data.avatar)
              this.handleSuccess = true;
              this.avatarChanged.emit(true)
            },
            error: () => {
              this.handleError = "Error ao enviar para o servidor";
            },
          }
        );
    }
  }
}
