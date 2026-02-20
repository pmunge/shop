import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment as env } from '../../envs/env';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = env.adminUrl;
  private apiUrl = `${this.baseUrl}/auth`;

  private usersUrl = `${ this.apiUrl}/users/all`
  private userUrl = `${this.apiUrl}/users/{userId}`
  private platformId = inject(PLATFORM_ID)
  constructor(
    private http: HttpClient,


  ) { }

  getUsers(): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.usersUrl, {observe: 'response'})
  }
  getUser(userId: string | number): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.userUrl.replace(`{userId}`, String(userId)), {observe: 'response'})
  } 

  updateUser (data: any): Observable <any>{
    if(!isPlatformBrowser(this.platformId)){
      return of({data: null});

    }
    return this.http.post<any>(this.userUrl, data)
  }
}
