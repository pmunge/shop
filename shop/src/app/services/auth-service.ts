import { Injectable, inject } from '@angular/core';
import { User } from '../models/User';
import { AuthResponseTs } from '../models/auth-response.ts';
import { RegisterResponseTs } from '../models/register-response.ts';
import { LoginRequest } from '../models/login-request';
import { Router } from '@angular/router';
import { environment as env } from '../../envs/env';

import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

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
  register(data: User): Observable<RegisterResponseTs> {
    return this.http.post<RegisterResponseTs>(this.registerapiUrl, data).pipe(
      tap((res) => console.log('Register Response: ', res)),
      catchError((err) =>
        throwError(
          () => new Error(err.error?.message || 'Registration failed'),
        ),
      ),
    );
  }

  //login
  login(credentials: LoginRequest): Observable<AuthResponseTs> {
    return this.http
      .post<AuthResponseTs>(this.loginapiUrl, credentials, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        map((res: HttpResponse<AuthResponseTs>) => {
          this.setToken(res);
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
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
  
  refreshToken(refreshToken: String){
    return this.http.post('/auth/refresh', {refreshToken})
  }

  setToken(res: any): string | null {
    const token = res.body?.token || res.body?.data?.token;
    if (token) {
      localStorage.setItem('token', token);
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
