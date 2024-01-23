import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  activeRoute = inject(ActivatedRoute)
  postServ = inject(PostService)
  postId: any = 0
  postArray: any[] = []

  ngOnInit(){
    this.postId = this.activeRoute.snapshot.paramMap.get('id')

    this.postArray = this.postServ.getPost().filter((post: any) => post.id == this.postId)
  }
}
