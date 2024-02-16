import { Replys } from './../../interfaces/replys';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from 'src/app/interfaces/posts';
import { PostService } from 'src/app/services/post.service';
import { MentionPipe } from 'src/app/pipes/mention.pipe';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MentionPipe, LoadingComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  activeRoute = inject(ActivatedRoute)
  postServ = inject(PostService)
  postId: any = 0
  postArray: Posts[] = []
  replyArray: Replys[] = []
  isLoaded: boolean = false

  ngOnInit(){
    this.postId = this.activeRoute.snapshot.paramMap.get('id')

    this.postArray = this.postServ.getPost().filter((post: any) => post.id == this.postId)

    this.replyArray = this.postArray[0].replys.sort((a:any, b: any) => {
      return (b.likes - b.deslikes) - (a.likes - a.deslikes)
    })

    setTimeout(() => {
      this.isLoaded = true
    }, 1500);

  }

  changeLike(id: number, type: string) {
    this.postServ.changeLike(this.postArray, id, type)
  }
  changeReplyLike(id: number, type: string) {
    this.postServ.changeLike(this.postArray[0].replys , id, type)
  }

  generateId() {
    let newId = ""
    for(let i = 0; i < 10; i++){
      const number = Math.floor(Math.random() * 10)
      newId += number
    }
    return parseInt(newId)
  }
  /* Remove when backend enters */
  addReply(reply: any) {
    const obj = this.postServ.generateObject('reply')
    obj.id = this.generateId()
    obj.reply = reply.value
    obj.author = "random"
    obj.date = this.postServ.generateDate()
    this.postServ.addNewReply(this.postId, obj)
    reply.value = ""
  }

  replyUser(user: string, input: any) {
    input.value = `@${user}`
  }

  verifyText(letters: any) {
    const splitLetters = letters.target.value.split("")

    splitLetters.forEach((letter: string, index: number) => {
      if (letter === '@' && index !== 0) {
        splitLetters.splice(index, 1)
        const newStr = splitLetters.join("")
        letters.target.value = newStr
      }
    })

  }
}
