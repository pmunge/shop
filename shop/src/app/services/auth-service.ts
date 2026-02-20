import { Injectable, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from '../../envs/env';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import { RegisterRequest, AuthResponse, RegisterResponse, LoginRequest } from '../models/User';
import { TokenService } from './token.service'

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
    @Inject(PLATFORM_ID) private platformId: Object,
    private tokenService: TokenService,
  ) {}

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.registerapiUrl, data).pipe(
      tap((res) => console.log('Register Response: ', res)),
      catchError((err) =>
        throwError(() => new Error(err.error?.message || 'Registration failed')),
      ),
    );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.loginapiUrl, credentials, {
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<AuthResponse>) => {
          this.tokenService.setToken(res);
          this.tokenService.setRole(res);
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('refreshToken');
    }
  }


  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }
}
