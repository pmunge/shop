import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import {Product} from '../models/product'


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  readonly cartItems$ = this.cartItems.asObservable();

  constructor() {}

  addToCart(product: Product){
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, product]);
  }
}
