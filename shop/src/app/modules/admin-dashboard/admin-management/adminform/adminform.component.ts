import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-adminform',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './adminform.component.html',
  styleUrl: './adminform.component.scss'
})
export class AdminformComponent {
   
   registerForm: FormGroup;
   admin = { firstName: '', secondName: '', email: '', role: '' };

  constructor (
    private adminService : AdminService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.registerForm = this.fb.group({
      firstName : ['', [Validators.required]],
      secondName : ['', [Validators.required]],
      email: ['', [Validators.required]],
      role : ['', [Validators.required]],
    })
  }

  addNewAdmin(){

    if (this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.registerForm.value;
    const adminData = {
      firstName: formData.firstName,
      secondName: formData.secondName,
      email: formData.email,
      role: formData.role
    };
    
    this.adminService.registerAdmin(adminData).subscribe({
      next: (res) =>{
        this.router.navigate(['/admin']);
        console.log(res)
      },
      error: (err) => {
        console.error(err)
      }
    })

  }

}
