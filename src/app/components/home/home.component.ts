import { Component, inject } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  postService = inject(PostService)
  posts: any = []

  ngOnInit() {
    this.posts = this.postService.getPost()
    console.log(this.posts);

  }

}
