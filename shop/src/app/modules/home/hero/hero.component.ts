import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  
  heroImages = [
    'assets/images/hero1.jpg',
    'assets/images/hero2.jpg',
    'assets/images/hero3.jpg',
    'assets/images/hero4.jpg'
    
  ];

  currentHeroImage = this.heroImages[0];

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    if(isPlatformBrowser(this.platformId)){
      setInterval(() =>{
        const nextIndex = (this.heroImages.indexOf(this.currentHeroImage) + 1) % this.heroImages.length;
        this.currentHeroImage = this.heroImages[nextIndex];
      }, 60000);
    }
  }
}
