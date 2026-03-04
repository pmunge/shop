import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LandingComponent} from './modules/pages/landing/landing.component';
import { LoaderComponent } from './modules/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LandingComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('shop')
}
