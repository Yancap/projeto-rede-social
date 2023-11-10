import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { authGuard } from './guards/auth.guard';
import { postsResolver } from './guards/posts.resolver';

const routes: Routes = [
  {path: '', redirectTo: "/login", pathMatch: "full"},
  {path: 'home', component: HomeComponent, canActivate: [authGuard], resolve: {
    posts: postsResolver
  }},
  {path: 'messages', component: MessagesComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
