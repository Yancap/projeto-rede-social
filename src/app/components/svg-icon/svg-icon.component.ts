import { Component} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent{
  icon = {
    email: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14H10.5V12.6H7C3.962 12.6 1.4 10.038 1.4 7C1.4 3.962 3.962 1.4 7 1.4C10.038 1.4 12.6 3.962 12.6 7V8.001C12.6 8.554 12.103 9.1 11.55 9.1C10.997 9.1 10.5 8.554 10.5 8.001V7C10.5 5.068 8.932 3.5 7 3.5C5.068 3.5 3.5 5.068 3.5 7C3.5 8.932 5.068 10.5 7 10.5C7.966 10.5 8.848 10.108 9.478 9.471C9.933 10.094 10.717 10.5 11.55 10.5C12.929 10.5 14 9.38 14 8.001V7C14 3.136 10.864 0 7 0ZM7 9.1C5.838 9.1 4.9 8.162 4.9 7C4.9 5.838 5.838 4.9 7 4.9C8.162 4.9 9.1 5.838 9.1 7C9.1 8.162 8.162 9.1 7 9.1Z" fill="#D0D0D0"/></svg>`,
    
  }
  constructor(
    private sanitizer: DomSanitizer,
    ) {}

  getSVG() {
    return this.sanitizer.bypassSecurityTrustHtml(this.icon.email)
  }
}
