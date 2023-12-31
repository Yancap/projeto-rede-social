import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { ResponsePosts } from '../../services/api.service.d';
import { ActivatedRoute } from '@angular/router';

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
    private apiService: ApiService,
    private route: ActivatedRoute
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
    let doc = document.documentElement
    const value = 100 * doc.scrollTop / (doc.scrollHeight - doc.clientHeight)
    
    if(!this.isEnded && !this.isLoading && value >= 95) {
      this.isLoading = true;
      this.page++
      this.apiService.getPost(this.page).subscribe(data => {
        if(data.length > 0) {
          this.posts.push(...data)
          this.isLoading = false;
          return;
        }
        this.isLoading = false;
        this.isEnded = true;
      });
    }
    
  }

  ngOnInit() {
    window.addEventListener("scroll", this.onScroll)
    this.posts = this.route.snapshot.data["posts"]
  }

  getPosts() {
    return this.apiService.getPost(1).subscribe(data => {
      return data;
    });
  }
}
