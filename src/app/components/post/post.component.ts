import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from 'src/app/interfaces/posts';
import { PostService } from 'src/app/services/post.service';
import { MentionPipe } from 'src/app/pipes/mention.pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MentionPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  activeRoute = inject(ActivatedRoute)
  postServ = inject(PostService)
  postId: any = 0
  postArray: Posts[] = []

  ngOnInit(){
    this.postId = this.activeRoute.snapshot.paramMap.get('id')

    this.postArray = this.postServ.getPost().filter((post: any) => post.id == this.postId)

  }

  changeLike(id: number, type: string) {
    this.postServ.changeLike(id, type)
  }
  /* Remove when backend enters */
  addReply(reply: any) {
    const obj = this.postServ.generateObject('reply')
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
