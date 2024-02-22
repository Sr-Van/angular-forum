import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-header',
  template: `
    <nav>
      <div class="logo" >
        <h1 routerLink="">Angulum</h1>
      </div>
      <div>
        <input type="text" id="search" (keyup)="search(searchInput, $event)" #searchInput>
        <i class="fa-solid fa-magnifying-glass" (click)="search(searchInput, $event)"></i>
      </div>
      <div class="user">
        <i class="fa-solid fa-user"></i>
        <a href="#">Log In</a>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  router = inject(Router)
  eventFilter = inject(EventService)

  search(search: any, event: any) {
    if(event.key === 'Enter' || event.pointerType === 'mouse') {
      this.eventFilter.filterEvent.emit()
      this.router.navigate([`search/${search.value}`])
    }
  }
}
