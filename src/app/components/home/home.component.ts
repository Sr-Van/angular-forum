import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Posts } from 'src/app/interfaces/posts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  postService = inject(PostService);
  router = inject(Router);

  apiSubscribe: Subscription;

  isLoaded: boolean = false;
  posts: Posts[] = [];
  actualPageArr: Posts[] = [];
  actualPag: number = 1;
  pages: number;

  ngOnInit() {
    this.apiSubscribe = this.postService.getPostsApi()?.subscribe((data) => {
      console.log(data);
      this.posts = data
      console.log(this.posts)
      this.pages =
        this.posts.length <= 5 ? 1 : this.generatePage(this.posts.length);

      this.updatePagePosts(this.posts, this.actualPag, 5);

      this.loadPage(1500);
    });

  }

  loadPage(time: number) {
    this.isLoaded = false;
    setTimeout(() => {
      this.isLoaded = true;
    }, time);
  }

  goToPost(id: number) {
    this.router.navigate([`/post/${id}`]);
  }

  updatePagePosts(array: Posts[], page: number, page_size: number) {
    this.actualPageArr = array.slice((page - 1) * page_size, page * page_size);
    this.loadPage(800);
  }

  nextPage() {
    if (this.actualPag === this.pages) {
      return;
    }
    this.actualPag++;
    this.updatePagePosts(this.posts, this.actualPag, 5);
  }

  previousPage() {
    if (this.actualPag === 1) {
      return;
    }
    this.actualPag--;
    this.updatePagePosts(this.posts, this.actualPag, 5);
  }

  generatePage(length: number) {
    let counter = 0;
    let pages = 1;
    for (let i = 0; i <= length; i++) {
      counter++;

      if (counter > 5) {
        pages++;
        counter = 0;
      }
    }

    return pages;
  }

  sortByMostLiked() {
    this.actualPageArr = this.posts
      .sort((a: any, b: any) => {
        return b.likes - a.likes;
      })
      .slice(0, 5);

    this.loadPage(1000);
  }
}
