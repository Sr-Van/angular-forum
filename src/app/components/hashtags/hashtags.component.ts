import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from 'src/app/interfaces/posts';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [],
  templateUrl: './hashtags.component.html',
  styleUrl: './hashtags.component.css'
})
export class HashtagsComponent {

  router = inject(Router)
  activateRoute = inject(ActivatedRoute)
  postService = inject(PostService)
  tag: any
  hashtagsArray: Posts[] = []

  ngOnInit() {
    this.tag = this.activateRoute.snapshot.paramMap.get('tag')
    this.getHashtagArray(this.postService.posts, this.tag)
  }

  getHashtagArray(array: any, tag: string) {
    array.map(({hashtags}: any, index: number) => {
      hashtags.forEach((hash: string) => {
        if (hash.toLowerCase().includes(tag.toLowerCase())) {
          this.hashtagsArray.push(array[index])
        }
      });
    })
  }
}
