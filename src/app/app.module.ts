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
import { PersonMessageComponent } from './components/person-message/person-message.component';
import { WritePostComponent } from './components/write-post/write-post.component';
import { MessageComponent } from './components/message/message.component';
import { LabelDataMessageComponent } from './components/message/label-data-message/label-data-message.component';
import { ModalProfileComponent } from './components/modal-profile/modal-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalProfileComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
