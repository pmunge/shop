import { Injectable } from '@angular/core';

import { environment as env } from '../../envs/env';

import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { isFloat32Array } from 'util/types';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseUrl = env.apiUrl;
  private apiUrl = `${this.baseUrl}/auth`;

  constructor(
    private http: HttpClient,
  ) { }
  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password/request`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password/complete`, { token, newPassword });
  }
}
