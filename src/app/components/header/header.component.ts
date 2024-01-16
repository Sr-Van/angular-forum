import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav>
      <div class="logo">
        <h1>Angulum</h1>
      </div>
      <div>
        <input type="text" id="search">
        <i class="fa-solid fa-magnifying-glass"></i>
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

}
