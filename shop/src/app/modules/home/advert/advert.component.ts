import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common'

@Component({
  selector: 'app-advert',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './advert.component.html',
  styleUrl: './advert.component.scss'
})
export class AdvertComponent {
  cardObjects = [
    {
      name: 'ShopGlow',
      description: 'Just use our products and see your skin getLocaleWeekEndRange',
      image: 'assets/images/adimage1.jpg'
    },
    {
      name: 'ShopGlow',
      description: 'Just use our products and see your skin getLocaleWeekEndRange',
      image: 'assets/images/adimage2.jpg'
    }
  ]

}
