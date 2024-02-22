import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';
import { Posts } from 'src/app/interfaces/posts';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  router = inject(Router)
  activateRoute = inject(ActivatedRoute)
  eventFilter = inject(EventService)
  postService = inject(PostService)

  postsSearchedArray: Posts[] = []
  search: any
  isLoad: boolean = false
  eventSubscripition: Subscription

  ngOnInit() {
    this.search = this.getSearch()
    this.eventSubscripition = this.eventFilter.filterEvent.subscribe(() => {
      setTimeout(() => {
        this.loadPage(600)
        this.search = this.getSearch()
        this.postsSearchedArray = this.postService.searchArrayFiltered(this.search)
      }, 500);
    })

    this.postsSearchedArray = this.postService.searchArrayFiltered(this.search)

    this.loadPage(1500)
  }

  loadPage(time: number) {
    this.isLoad = false
    setTimeout(() =>{
      this.isLoad = true
    }, time)
  }

  getSearch() {
    return this.activateRoute.snapshot.paramMap.get('search')
  }

}
