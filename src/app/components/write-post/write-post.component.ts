import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.scss']
})
export class WritePostComponent {
  public post: {
    title: string;
    text: string;
    image: string | ArrayBuffer | null;
  } = {
    title: "",
    text: "",
    image: null,
  };
  public response: any;


  constructor(
    private service: ApiService
  ) { }

  setImage(event: any | InputEvent){
    if(event.target) {
      let reader = new FileReader();
      reader.onload = () => {
          this.post.image = reader.result
      }
      if(event.target.files) {
        try{
          reader.readAsDataURL(event.target.files[0]);
        } catch { }
      }
    }
  }

  handlePublish(){
    this.service.createPost({...this.post, user_tag: "@yan"}).subscribe(data => {
      this.response = data;
      console.log(data);
      
    })
  }
}
