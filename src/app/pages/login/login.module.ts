import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowLoginComponent } from 'src/app/components/window-login/window-login.component';
import { LoginComponent } from './login.component';
import { SvgIconComponent } from 'src/app/components/svg-icon/svg-icon.component';



@NgModule({
  declarations: [
    LoginComponent,
    WindowLoginComponent,
    SvgIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ LoginComponent ]
})
export class LoginModule { }
