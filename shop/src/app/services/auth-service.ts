import { Injectable, inject } from '@angular/core';
import { RegisterRequest } from '../models/User';
import { AuthResponse } from '../models/User';
import { RegisterResponse} from '../models/User';
import { LoginRequest } from '../models/User';
import { Router } from '@angular/router';
import { environment as env } from '../../envs/env';

import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { isFloat32Array } from 'util/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = env.apiUrl;
  private apiUrl = `${this.baseUrl}/auth`;

  private registerapiUrl = `${this.apiUrl}/register`;
  private loginapiUrl = `${this.apiUrl}/login`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  //registration of new users
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.registerapiUrl, data).pipe(
      tap((res) => console.log('Register Response: ', res)),
      catchError((err) =>
        throwError(
          () => new Error(err.error?.message || 'Registration failed'),
        ),
      ),
    );
  }

  //login
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.loginapiUrl, credentials, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        map((res: HttpResponse<AuthResponse>) => {
          this.setToken(res);
          this.setRole(res)
          if (!res.body) {
            throw new Error('No response body');
          }
          return res.body;
        }),
        catchError((err) =>
          throwError(() => new Error(err.error?.message || 'Login Failed')),
        ),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getRole(): string | null{
    return localStorage.getItem('role')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
  
  refreshToken(refreshToken: String){
    return this.http.post('/auth/refresh', {refreshToken})
  }

  setToken(res: any): string | null {
    const token =  res.body?.data?.token;
    if (token) {
      localStorage.setItem('token', token);
      return token;
    }
    return null;
  }
  setRole (res: any ): string | null {
    const role =  res.body?.data?.role;
    if(role){
      localStorage.setItem("role", role);
      return role;
    }

    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
}
