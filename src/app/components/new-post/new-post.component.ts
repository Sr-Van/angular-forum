import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  postService = inject(PostService)
  router = inject(Router)

  date = new Date()
  form: FormGroup;

  hashtags: any = []

  ngOnInit() {
    this.form = new FormGroup({
      header: new FormControl,
      post: new FormControl
    })
  }

  generateId() {
    let newId = ""
    for(let i = 0; i < 10; i++){
      const number = Math.floor(Math.random() * 10)
      newId += number
    }
    return parseInt(newId)
  }

  /* apagar quando fizer auth de login */
  getUser() {
    let newUser = 'user'
    for(let i = 0; i < 10; i++){
      const number = Math.floor(Math.random() * 10)
      newUser += number
    }

    return newUser
  }

  addHashtag(event: any) {
    if (event.code === 'Enter') {
      this.hashtags.push(event.target.value)
      event.target.value = ""
    }
  }

  sendPost(form: any) {

    const obj = this.postService.generateObject("post")
    obj.id = this.generateId()
    obj.author = this.getUser()
    obj.header = form.value.header
    obj.post = form.value.post
    obj.date = this.postService.generateDate()
    obj.likes = 0
    obj.deslikes = 0
    obj.replys = []
    obj.hashtags = this.hashtags

    this.postService.addNewPost(obj)
    this.router.navigate([`/post/${obj.id}`])

    this.form.reset()
  }
}
