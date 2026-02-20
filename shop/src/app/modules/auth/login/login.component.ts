import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router'
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { AuthService} from '../../../services/auth-service';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = true;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
       
    }

    this.isLoading = true;    
    const loginDetails = this.loginForm.value;

    this.authService.login(loginDetails).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        if(this.tokenService.getRole() === "ADMIN"){
          this.router.navigateByUrl("admin")
        }
        if(this.tokenService.getRole() === "USER"){
          this.router.navigateByUrl("home")
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword= !this.showPassword;
  }
}
