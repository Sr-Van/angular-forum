import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  date = new Date()
  form: FormGroup;

  hashtags: any = []

  ngOnInit() {
    this.form = new FormGroup({
      header: new FormControl,
      post: new FormControl
    })
  }


  generateDate() {
    return `${this.date.getDay()}/${this.date.getMonth() + 1}/${this.date.getFullYear()} ${this.date.getHours()}:${this.date.getMinutes()}`
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

    const obj = form.value
    obj.id = this.generateId()
    obj.author = this.getUser()
    obj.date = this.generateDate()
    obj.likes = 0
    obj.deslikes = 0
    obj.replys = []
    obj.hashtags = this.hashtags

    console.log(obj);
    this.form.reset()
  }
}
