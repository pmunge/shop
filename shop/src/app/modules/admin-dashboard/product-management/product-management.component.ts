import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {

  productForm: FormGroup

  constructor (
    private fb : FormBuilder,
    private productService : ProductsService,

  ){
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],
      discount: ['', Validators.required],
      active: ['', Validators.required],
      serialNumber: ['', Validators.required]
    })
  }

  newProduct(): void{
    this.productService.newProduct().subscribe({
      next: () =>{

      },
      error: (err) =>
        console.log(err)
    })
  }
  updateProductInfo(): void {

  }
  updateProductPrice(): void {

  }
  updateProductInventory(): void{
    
  }

}
