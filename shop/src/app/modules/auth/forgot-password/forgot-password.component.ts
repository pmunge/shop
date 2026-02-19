import { Component } from '@angular/core';
import { PasswordService} from '../../../services/password.service';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
import {Router, RouterModule} from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPassword {
  email = '';
  isLoading = false;
  message = '';
  error= '';

  constructor(private passwordService: PasswordService){

  }
  onSubmit(): void{
    this.isLoading = true;
    this.error = ''
    this.message = '';

    this.passwordService.forgotPassword(this.email).subscribe({
      next: (response)=> {
        this.isLoading = false;
        this.message = ' Check your email';
      },
      error: (error) =>{
        this.isLoading = false;
        this.error = error.message ||'Failed to send';
      }
    });
  }

}