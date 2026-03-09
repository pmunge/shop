import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { ProductsService, FeaturedCategory} from '../../../services/products.service';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, SlicePipe],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent implements OnInit {
   
  featuredCategories: FeaturedCategory[] = [];
  isLoading = true

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: FeaturedCategory[]) =>{
        this.featuredCategories = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Error fetching featured products' ,err);
        this.isLoading = false;
      }
    })
  }

}
