import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'; 
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { environment as env } from '../../envs/env';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = env.adminUrl;
  private apiUrl = `${this.baseUrl}/auth/admins`

  private registerUrl = `${this.apiUrl}/register`
  private statusUrl = `${this.apiUrl}/update/status/{userId}`
  private roleUrl = `${this.apiUrl}/update/role/{userId}`
  private allUrl = `${ this.apiUrl}/all`
  private adminUrl = `${this.apiUrl}/{userId}`

  constructor(
    private http: HttpClient,

  ) { }

  registerAdmin(data: {firstName: string; secondName: string; email: string; role: string} ): Observable<HttpResponse<any>>{
    return this.http.post<any>(this.registerUrl, data, { observe: 'response'} )
  }

  updateStatus(userId : string | number, newStatus : string): Observable<HttpResponse<any>>{
    const body = {role : newStatus};
    return this.http.post<any>(this.statusUrl , body,  { observe: 'response'})
  }
  updateRole(userId : string | number, newRole : string): Observable<HttpResponse<any>>{
    const body = {role : newRole};

    return this.http.post<any>(this.roleUrl , body,  { observe: 'response'})
  }
  getAdmins(): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.allUrl,  { observe: 'response'})
  }
  getAdmin(userId: string | number): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.adminUrl.replace(`{userId}`, String(userId)),  { observe: 'response'})
  }
}
