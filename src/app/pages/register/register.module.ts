import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { SvgIconComponent } from 'src/app/components/svg-icon/svg-icon.component';
import { LoginModule } from '../login/login.module';
import { SvgIconModule } from 'src/app/components/svg-icon/svg-icon.module';
import { WindowRegisterComponent } from 'src/app/components/window-register/window-register.component';



@NgModule({
  declarations: [
    RegisterComponent,
    WindowRegisterComponent
  ],
  imports: [
    CommonModule,
    SvgIconModule
  ],
  exports: [ RegisterComponent ]
})
export class RegisterModule { }
