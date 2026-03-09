import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import {Product} from '../models/product'


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([])
  
  constructor(
    cartItems$ = this.cartItems.asObservable(),
  ) { }

  addToCart(product: Product){
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, product])
  }
}
