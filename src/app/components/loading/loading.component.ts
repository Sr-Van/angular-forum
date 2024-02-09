import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
  <div class="container">
    <div class="loading"></div>
  </div>`,
  styles: `.loading {
    position: relative;
    height: 6px;
    width: 27px;

    border-radius: 10px;

    background-color: red;
    animation: toBottom 900ms ease infinite;
  }

  .loading::before {
    content:"";
    position: absolute;
    height: 6px;
    width: 50px;
    rotate: 60deg;

    border-radius: 7px;
    border-top-right-radius: 10px;

    background-color: red;
    animation: toSides 1.5s ease infinite;
  }

  .loading::after {
    content:"";
    position: absolute;
    height: 6px;
    width: 50px;
    rotate: -60deg;
    left: -25px;

    border-radius: 7px;
    border-top-left-radius: 10px;

    background-color: red;
    animation: toSides 1.5s ease infinite;
  }

  @keyframes toSides {
    30% {
      transform: translateY(-8px);
    }

    50% {
      transform: translateY(0);
    }
  }

  @keyframes toBottom {
    30% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(0);
    }
  }
  `
})
export class LoadingComponent {

}
