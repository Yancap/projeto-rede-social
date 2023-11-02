import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 

  public modalOpened = false;
  @ViewChild('modal') modal!: ElementRef<HTMLElement>;

  constructor(
    private apiService: ApiService
  ){}
  
  public handleOpenModal() {
    this.modalOpened = true;
    document.body.style.overflowY = 'hidden';
  }
  public handleCloseModal(event: MouseEvent){
    if(event.target === this.modal.nativeElement) {
      this.modalOpened = false;
      document.body.style.overflowY = 'initial';
    }
  }

  ngOnInit() {
    this.apiService.getPost();
  }
}
