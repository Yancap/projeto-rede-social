import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { ResponsePosts } from '../../services/api.service.d';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 

  public modalOpened = false;
  public posts$!: Observable<ResponsePosts[]>;
  public posts: ResponsePosts[] = [];
  public isLoading = false;
  public isEnded = false;
  public page: number = 1;
  public thisPost!: ResponsePosts;

  @ViewChild('modal') modal!: ElementRef<HTMLElement>;

  constructor(
    private apiService: ApiService
  ){}
  
  public handleOpenModal(post: ResponsePosts) {
    this.thisPost = post
    this.modalOpened = true;
    document.body.style.overflowY = 'hidden';
  }
  public handleCloseModal(event: MouseEvent){
    if(event.target === this.modal.nativeElement) {
      this.modalOpened = false;
      document.body.style.overflowY = 'initial';
    }
  }

  onScroll = (event: any) =>{
    if(!this.isEnded) {
      this.page++
      this.isLoading = true;
      this.apiService.getPost(this.page).subscribe(data => {
        if(data.length > 0) {
          this.posts.push(...data)
          this.isLoading = false;
          return;
        }
        this.isEnded = true;
      });
    }
    
  }

  ngOnInit() {
    
    window.addEventListener("scrollend", this.onScroll)
    this.isLoading = true;
    this.apiService.getPost(1).subscribe(data => {
      this.posts.push(...data)
      this.isLoading = false;
    });
  }
}
