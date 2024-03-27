import { Component, inject } from '@angular/core';

import {  SocialAuthService, SocialUser, GoogleSigninButtonModule, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(SocialAuthService)
  switchToSigin: boolean = false
  router = inject(Router)

  user: SocialUser
  loggedIn: boolean

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user)
    });

    if (this.loggedIn) this.router.navigate(['/'])
  }
}
