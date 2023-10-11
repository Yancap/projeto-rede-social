import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnChanges{
  @Input() public height = ""
  @Input() public width = ""
  @Input() public name = ""

  
  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  getSVG() {
    const icon: any = {
      email: `<svg width="${this.width}" height="${this.height}" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14H10.5V12.6H7C3.962 12.6 1.4 10.038 1.4 7C1.4 3.962 3.962 1.4 7 1.4C10.038 1.4 12.6 3.962 12.6 7V8.001C12.6 8.554 12.103 9.1 11.55 9.1C10.997 9.1 10.5 8.554 10.5 8.001V7C10.5 5.068 8.932 3.5 7 3.5C5.068 3.5 3.5 5.068 3.5 7C3.5 8.932 5.068 10.5 7 10.5C7.966 10.5 8.848 10.108 9.478 9.471C9.933 10.094 10.717 10.5 11.55 10.5C12.929 10.5 14 9.38 14 8.001V7C14 3.136 10.864 0 7 0ZM7 9.1C5.838 9.1 4.9 8.162 4.9 7C4.9 5.838 5.838 4.9 7 4.9C8.162 4.9 9.1 5.838 9.1 7C9.1 8.162 8.162 9.1 7 9.1Z" fill="#D0D0D0"/></svg>`,
      password: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.23081 12.1905C9.24619 12.1905 10.077 11.5048 10.077 10.6667C10.077 9.82857 9.24619 9.14286 8.23081 9.14286C7.21542 9.14286 6.38465 9.82857 6.38465 10.6667C6.38465 11.5048 7.21542 12.1905 8.23081 12.1905ZM13.7693 5.33333H12.8462V3.80952C12.8462 1.70667 10.7785 0 8.23081 0C5.68311 0 3.61542 1.70667 3.61542 3.80952V5.33333H2.69235C1.67696 5.33333 0.846191 6.01905 0.846191 6.85714V14.4762C0.846191 15.3143 1.67696 16 2.69235 16H13.7693C14.7847 16 15.6154 15.3143 15.6154 14.4762V6.85714C15.6154 6.01905 14.7847 5.33333 13.7693 5.33333ZM5.36927 3.80952C5.36927 2.50667 6.65235 1.44762 8.23081 1.44762C9.80927 1.44762 11.0923 2.50667 11.0923 3.80952V5.33333H5.36927V3.80952ZM13.7693 14.4762H2.69235V6.85714H13.7693V14.4762Z" fill="#D0D0D0"/></svg>`,

    }
    if(this.name in icon) {
      const element = icon[this.name] 
      return this.sanitizer.bypassSecurityTrustHtml(element)
    }
    return null
  }
  ngOnChanges(changes: SimpleChanges): void { }

}
