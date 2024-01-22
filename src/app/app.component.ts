import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'karw';

  constructor(
    private location: Location
  ) {}

  goBack = () => {
    this.location.back()
  }

}
