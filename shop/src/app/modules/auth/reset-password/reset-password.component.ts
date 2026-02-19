import { Component, OnInit } from '@angular/core'; // ← Added OnInit
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService} from '../../../services/password.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPassword implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';
  isLoading = false;
  message = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || '';

    if (!this.token) {
      this.error = 'Invalid or missing reset token';
    }
  }

  onSubmit(): void { 
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    
    this.isLoading = true; 
    this.error = '';

    this.passwordService.resetPassword( this.token, this.newPassword).subscribe({ 
      next: (response) => { 
        this.isLoading = false;
        this.message = 'Password reset was successful!';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); 
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message || 'Failed to reset password';
      }
    });
  }
}