import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
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

  newProduct(): Observable <any>{
    return this.http.post<any>(this.productsUrl, ReportBody)
  }
  getProducts(): Observable<any>{
    return this.http.get<any>(this.productsUrl)
  }
  getProductById(productId : string | number) : Observable<any>{
    return this.http.get<any>(this.productsUrl)
  }
  updateProductInfo(productId: string | number, info: string): Observable<any>{
    return this.http.put<any>(this.productsUrl.replace(`{productId}`, String(productId)), ReportBody)
  }
  updateProductPrice(productId: string | number, price: string | number): Observable<any>{
    return this.http.put<any>(this.productsUrl.replace(`{productId}`, String(productId)), ReportBody)
  }
  updateProductInventory(productId: string | number, inventory: number): Observable<any>{
    return this.http.put<any>(this.productsUrl.replace(`{productId}`,  String(productId)), ReportBody)
  }
}
