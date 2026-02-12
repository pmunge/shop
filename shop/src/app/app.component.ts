import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LandingComponent} from './modules/pages/landing/landing.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LandingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('shop')
}
