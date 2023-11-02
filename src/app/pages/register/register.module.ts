import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { SvgIconModule } from 'src/app/components/svg-icon/svg-icon.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttpService } from '../../services/auth.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, SvgIconModule, FormsModule, HttpClientModule],
  exports: [RegisterComponent],
  providers: [AuthHttpService],
})
export class RegisterModule {}
