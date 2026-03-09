import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPassword } from './modules/auth/forgot-password/forgot-password.component';
import { ResetPassword } from './modules/auth/reset-password/reset-password.component';
import { LandingComponent } from './modules/pages/landing/landing.component';
import { AdminManagementComponent } from './modules/admin-dashboard/admin-management/admin-management.component';
import { resetGuard } from './guards/reset.guard';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { usersGuard } from './guards/users.guard';
import { UserManagementComponent } from './modules/admin-dashboard/user-management/user-management.component';
import { HomeComponent } from './modules/home/home.component';
import { PagesComponent } from './modules/pages/pages.component';
import { CategoryComponent } from './modules/home/category/category.component';
import { FeaturedProductsComponent } from './modules/home/featured-products/featured-products.component';
import { HeroComponent } from './modules/home/hero/hero.component';
import { CartComponent } from './modules/user-dashboard/cart/cart.component';
import { CheckoutComponent } from './modules/user-dashboard/checkout/checkout.component';
import { AdminformComponent } from './modules/admin-dashboard/admin-management/adminform/adminform.component';
import { ProductsComponent } from './modules/products/products.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot',
    component: ForgotPassword,
  },
  {
    path: 'reset',
    component: ResetPassword,
    canActivate: [resetGuard],
  },
  {
    path: 'users',
    component: PagesComponent,
    canActivate: [authGuard, usersGuard],
    children: [{ path: '', component: UserManagementComponent }],
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'carts', component: CartComponent },
      { path: 'cart', redirectTo: 'carts', pathMatch: 'full' },
      { path: 'admin', component: AdminManagementComponent, canActivate: [adminGuard] },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
  {
    path: 'addAdmin',
    component: AdminformComponent,
    canActivate: [adminGuard],
  },
];
