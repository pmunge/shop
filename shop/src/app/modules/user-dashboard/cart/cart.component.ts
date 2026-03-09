import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems = [
    {
      name: 'Hibiscus',
      price: 1200,
      quantity: 1,
      image: 'assets/images/cart/hibiscus.jpg'
    },
    {
      name: 'Lipstick',
      price: 800,
      quantity:2,
      image: 'assets/images/cart/lip.jpg'
    },
    {
      name: 'Zinc',
      price: 1500,
      quantity: 1,
      image: 'assets/images/cart/zinc.jpg'
    },
    {
      name: 'Castor Oil',
      price: 500,
      quantity: 2,
      image: 'assets/images/cart/cas.jpg'
    }
  ];
  increase(item: any){
    item.quantity++;

  }
  decrease(item: any){
    if(item.quantity > 1){
      item.quantity--;
    }
  }
  getCartTotal(){
    return this.cartItems
          .reduce((total, item)=> total + (item.price * item.quantity), 0)
          .toFixed(2)
  }

}
