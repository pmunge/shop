import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPassword } from './modules/auth/forgot-password/forgot-password.component';
import { ResetPassword } from './modules/auth/reset-password/reset-password.component';
import { LandingComponent } from './modules/pages/landing/landing.component';
import { AdminComponent} from './modules/admin-dashboard/admin/admin.component';
import { resetGuard} from './guards/reset.guard';
import {adminGuard} from './guards/admin.guard';
import {authGuard} from './guards/auth.guard';
import {UserManagementComponent} from './modules/admin-dashboard/user-management/user-management.component';
import { HomeComponent } from './modules/home/home.component';
import { PagesComponent} from './modules/pages/pages.component';
import { CategoryComponent } from './modules/home/category/category.component';
import { FeaturedProductsComponent } from './modules/home/featured-products/featured-products.component';
import { HeroComponent } from './modules/home/hero/hero.component';

export const routes: Routes = [
  //{ 
    //path: '', 
    //component: LandingComponent,
   //},
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
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
    component: UserManagementComponent,
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', component: HomeComponent},
    ]
  },
  
];
