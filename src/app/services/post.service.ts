import { HttpClient } from '@angular/common/http';
import { Posts } from './../interfaces/posts';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);

  readonly url: string = 'http://localhost:8080/api/';

  date = new Date();
  /* remover quando fizer a requisicao */
  posts: any = [];
  postsSearched: any = [];


  getPostsApi(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url + 'posts');
  }

  getPostApi(id: number): Observable<Posts> {
    return this.http.get<Posts>(this.url + `post/${id}`);
  }


  generateObject(type: string) {
    if (type === 'post') {
      return {
        id: 0,
        header: '',
        post: '',
        author: '',
        date: '',
        likes: 0,
        deslikes: 0,
        replys: [],
        hashtags: [],
      };
    }

    return {
      reply: '',
      author: '',
      date: '',
      likes: 0,
      deslikes: 0,
    };
  }

  changeLike(array: any, id: number, type: string) {
    const indexToLike = array.map((post: Posts) => post.id).indexOf(id);

    if (type === 'like') {
      array[indexToLike].likes++;
      return;
    }
    array[indexToLike].deslikes++;
  }

  addNewPost(post: any) {
    this.posts.push(post);
  }

  addNewReply(id: any, reply: any) {
    const postId = this.posts.map((post: any) => post.id).indexOf(parseInt(id));
    this.posts[postId].replys.push(reply);

  }


  generateDate() {
    return `${this.date.getDay()}/${
      this.date.getMonth() + 1
    }/${this.date.getFullYear()} ${this.date.getHours()}:${this.date.getMinutes()}`;
  }

  searchArrayFiltered(search: string) {
    /* esvaziando o array toda vez que pesquisar */
    this.postsSearched = [];
    /* separando as palavras pesquisadas em um array*/
    const wordsSearched = search.split(' ');

    /* testando cada palavra */
    wordsSearched.forEach((word) => {
      /* filtra o array para uma const que armazena baseado no boolean recebido pelo includes */
      const found = this.posts.filter((post: any) => {
        return post.post.toLowerCase().includes(word.toLowerCase());
      });

      /* se o array nao estiver vazio, da push no array de searched com todos items */
      if (found.length > 0) {
        for (let i = 0; i < found.length; i++) {
          this.postsSearched.push(found[i]);
        }
      }
    });

    return this.postsSearched;
  }
}
