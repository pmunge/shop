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
import { LoadingService } from '../../../services/loading-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    public loadingService: LoadingService,
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
   
    const loginDetails = this.loginForm.value;
    this.loadingService.show();

    this.authService.login(loginDetails).subscribe({
      next: (res) => {
        console.log(res);
        this.loadingService.hide();
          this.router.navigateByUrl("", { replaceUrl: true })
        
      },
      error: (err) => {
        console.log(err);
        this.loadingService.hide();
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword= !this.showPassword;
  }
}
