import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  postService = inject(PostService)
  router = inject(Router)

  isLoaded: boolean = false
  posts: any = []

  ngOnInit() {
    this.posts = this.postService.getPost()
    console.log(this.posts);

    setTimeout(() => {
      this.isLoaded = true
    }, 1500)

  }

  goToPost(id: number) {
    this.router.navigate([`/post/${id}`])
  }

  sortByMostLiked() {
    this.posts = this.posts.sort((a:any, b: any) => {
      return b.likes - a.likes
    })

    setTimeout(() => {
      this.isLoaded = true
    }, 1000);
    this.isLoaded = false

  }
}
