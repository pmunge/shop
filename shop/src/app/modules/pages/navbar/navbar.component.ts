import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import {TokenService} from '../../../services/token.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) {}

  navItems = [
    { path: '/', label: 'Home',  },
    { path: '/tours', label: 'Products' , showWhen: 'always'},
    { path: '/about', label: 'Cart', showWhen: 'authenticated', requiredRole: 'USER' },
    { path: '/contact', label: 'Orders', showWhen: 'authenticated', requiredRole: 'USER' },
    { path: '/contact', label: 'Users', showWhen: 'authenticated', requiredRole: 'ADMIN' },
    { path: '/contact', label: 'Admins', showWhen: 'authenticated', requiredRole: 'SUPERADMIN' },
  ];

  shouldShowItem(item: any): boolean{
    const isAuth = this.authService.isAuthenticated();

    if(item.showWhen === 'always') return true;
    if( item.showWhen === 'public') return !isAuth;
    if (item.showWhen === 'authenticated'){
      if (!isAuth) return false;
      
      // If item has a required role, check if user's role matches
      if(item.requiredRole){
        const userRole = this.tokenService.getRole();
        if (!userRole || userRole !== item.requiredRole) {
          return false;
        }
      }
      return true;
    }

    return false;

  }
  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
