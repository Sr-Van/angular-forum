import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

import {  SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

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
      @if(loggedIn) {
        <div class="user_photo">
          <img src="{{ user.photoUrl }}" referrerpolicy="no-referrer">
        </div>
      }
      @else {
        <div class="user" routerLink="login">
          <i class="fa-solid fa-user"></i>
          <a>Log In</a>
        </div>
      }
    </nav>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  router = inject(Router)
  eventFilter = inject(EventService)
  authService = inject(SocialAuthService)

  search(search: any, event: any) {
    if(event.key === 'Enter' || event.pointerType === 'mouse') {
      this.eventFilter.filterEvent.emit()
      this.router.navigate([`search/${search.value}`])
    }
  }

  user: SocialUser
  loggedIn: boolean

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
}
