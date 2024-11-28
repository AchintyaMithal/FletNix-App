import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../src/environments/environment.dev';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false; 
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Checking for auth and setting username

    const authJson = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    const auth = authJson ? JSON.parse(authJson) : null;

    if (auth) {
      this.userSubject.next(user);
      if (this.router.url === '/register') {
        this.router.navigate(['/home']);
      } else if (this.router.url === '/home') {
      }
    }    
  }

  // login function (returns Observable)
  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: any }> {
    const credentials = { email: email, password: password };
    return this.http
      .post<{ token: string; user: any }>(
        `${environment.apiBaseUrl}login`,
        credentials
      )
      .pipe(
        tap((response) => {
          this.loggedIn = true;
          localStorage.setItem('token', JSON.stringify(response.token));
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userSubject.next(response.user)
        })
      );
  }

  // handling logut
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // checking the user is logged in or not
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token is not null or undefined
  }
}
