import { Component } from '@angular/core';
import { HeroComponent} from './hero/hero.component';
import {CategoryComponent} from './category/category.component';
import { FeaturedProductsComponent} from './featured-products/featured-products.component';
import {AdvertComponent} from  './advert/advert.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    CategoryComponent,
    FeaturedProductsComponent,
    AdvertComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
