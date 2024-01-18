import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: any = [{
    id: 32443,
    author: 'blaBLA',
    date: '2024-03-01',
    header: 'quero fazer um component standalone',
    post: 'quero fazer um component standalone em angular e nao consigo... sempre da erro no ngModule principal do meu projeto',
    likes: 12,
    deslikes: 3,
    replys: [{
      author: 'julin21',
      date: '2024-03-02',
      reply: 'basta colocar standalone = true',
      likes: 2,
      deslikes: 10
      },
      {
        author: 'pedro1212',
        date: '2024-03-04',
        reply: 'se olhar a documentacao e bem simples de utilizar',
        likes: 5,
        deslikes: 2
      }
    ]
  },
  {
    id: 3243243,
    author: 'pauletafuracao',
    date: '2024-02-15',
    header: 'Angular ou React?',
    post: 'quero comecar em angular, é melhor que react?',
    likes: 3,
    deslikes: 0,
    replys: []
  }]

  constructor() { }

  getPost() {
    return this.posts
  }
}
