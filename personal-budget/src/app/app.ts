import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

//importing self-made components
//import menu component
import { Menu } from './menu/menu';
//import hero component
import { Hero } from './hero/hero';
//import homepage component
// import { Homepage } from './homepage/homepage';
//import footer component
import { Footer } from './footer/footer';

@Component({
  selector: 'pb-root',
  imports: [RouterOutlet, Menu, Hero, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-budget');
}
