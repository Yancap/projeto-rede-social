import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SvgIconModule } from './components/svg-icon/svg-icon.module';
import { RegisterModule } from './pages/register/register.module';
import { HomeModule } from './pages/home/home.module';
import { HeaderComponent } from './components/header/header.component';
import { MessagesModule } from './pages/messages/messages.module';
import { ModalProfileComponent } from './components/modal-profile/modal-profile.component';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component';
import { ChangeAvatarService } from './components/change-avatar/change-avatar.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalProfileComponent,
    ChangeAvatarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SvgIconModule,
    RegisterModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HomeModule,
    MessagesModule
  ],
  providers: [ChangeAvatarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
