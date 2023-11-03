import { Component, Input } from '@angular/core';
import { ResponsePosts } from '../../services/api.service.d';

@Component({
  selector: 'modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent {
  @Input() post!: ResponsePosts;
}
