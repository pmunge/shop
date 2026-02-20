import { Injectable, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
     private http: HttpClient,
     
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('SSR_TOKEN') @Optional() private ssrToken: string | null,
  ) { }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return this.ssrToken || null;
  }

  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  refreshToken(refreshToken: string) {
    return this.http.post('/auth/refresh', { refreshToken });
  }

  setToken(res: any): string | null {
    const token = res.body?.data?.token;
    if (token && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      return token;
    }
    return token || null;
  }

  setRole(res: any): string | null {
    const role = res.body?.data?.role;
    if (role && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('role', role);
      return role;
    }
    return role || null;
  }
}
