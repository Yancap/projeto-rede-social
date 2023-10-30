import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SvgIconModule } from 'src/app/components/svg-icon/svg-icon.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttpService } from 'src/app/services/auth.services';

@NgModule({
  declarations: [LoginComponent],
  imports: [FormsModule, CommonModule, SvgIconModule, HttpClientModule],
  providers: [AuthHttpService],
  exports: [LoginComponent],
})
export class LoginModule {}
