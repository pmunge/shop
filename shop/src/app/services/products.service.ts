import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

import {Product} from '../models/product'
import { environment as env } from '../../envs/env';

export interface FeaturedCategory{
  category: string;
  products: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = env.apiUrl;
  private apiUrl= `${this.baseUrl}/product`;
  private productsUrl = `${this.apiUrl}/product`;
  private featuredProductsUrl = `${this.apiUrl}/featuredproduct`;
  private discountedProductsUrl = `${this.apiUrl}/discountedproduct`;

  constructor( private http: HttpClient) { }

  getFeaturedProducts(): Observable<FeaturedCategory []>{
    return this.http.get<FeaturedCategory[]>(this.featuredProductsUrl)
  }
}
