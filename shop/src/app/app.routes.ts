import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPassword } from './modules/auth/forgot-password/forgot-password.component';
import { ResetPassword } from './modules/auth/reset-password/reset-password.component';
import { LandingComponent } from './modules/pages/landing/landing.component';
import { HomeComponent} from './modules/user-dashboard/home/home.component';
import { AdminComponent} from './modules/admin-dashboard/admin/admin.component'

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'forgot',
    component: ForgotPassword,
  },
  {
    path: 'reset',
    component: ResetPassword,
  }
];
