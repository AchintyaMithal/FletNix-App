// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: token,
    });
  }

  getAuthToken(): string {
    const auth = localStorage.getItem('token');
    return auth ? JSON.parse(auth) : '';
  }

  register(data: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}register`, data);
  }

  getShows(page: number, type: string, searchStr: string, itemsPerPage = 15): Observable<any> {
    const token = this.getAuthToken();
    const headers = this.getHeaders(token);
    const url = `${environment.apiBaseUrl}content/${page}?type=${type}&searchStr=${searchStr}&page_size=${itemsPerPage}`;
    return this.http.get<any>(url, { headers });
  }

  getInitialShows(): Observable<any> {
    const token = this.getAuthToken();
    const headers = this.getHeaders(token);
    const url = `${environment.apiBaseUrl}content/`;
    return this.http.get<any>(url, { headers });
  }

  getShowDetails(id: string): Observable<any> {
    const token = this.getAuthToken();
    const headers = this.getHeaders(token);
    const url = `${environment.apiBaseUrl}content/details/${id}`;
    return this.http.get<any>(url, { headers });
  }
}
