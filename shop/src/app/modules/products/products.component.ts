import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 

import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProducts();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          console.log('Productloaded', product);
        },
        error: (err) => console.error('Error fetching product', err)
      });
    }
  }

  getProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = this.normalizeProducts(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  selectProduct(product: Product): void {
    this.cartService.addToCart(product);
  }

  private normalizeProducts(res: any): Product[] {
    if (Array.isArray(res)) {
      return res as Product[];
    }

    if (Array.isArray(res?.data)) {
      return res.data as Product[];
    }

    if (Array.isArray(res?.body?.data)) {
      return res.body.data as Product[];
    }

    return [];
  }

}
