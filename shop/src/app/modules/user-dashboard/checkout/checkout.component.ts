import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';



@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatTabsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  checkoutForm : FormGroup

  constructor (
    private fb : FormBuilder,

  ){
    this.checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    phone: ['', Validators.required],
    location:['', Validators.required],
    cardId: ['', Validators.required],
    expiryDate: ['', Validators.required],
    no : ['', Validators.required],

  })
  }
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
