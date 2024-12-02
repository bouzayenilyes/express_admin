import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = this.getUserFromToken(token);
      this.currentUserSubject.next(user);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    // Simulate API call
    if (email === 'test@test.com' && password === 'password') {
      const response: AuthResponse = {
        token: 'fake-jwt-token',
        user: {
          id: 1,
          email: 'test@test.com',
          name: 'Test User',
          role: 'client'
        }
      };
      this.handleAuthentication(response);
      return of(response);
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  register(email: string, password: string, name: string): Observable<AuthResponse> {
    // Simulate API call
    const response: AuthResponse = {
      token: 'fake-jwt-token',
      user: {
        id: 1,
        email,
        name,
        role: 'client'
      }
    };
    this.handleAuthentication(response);
    return of(response);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    this.currentUserSubject.next(response.user);
  }

  private getUserFromToken(token: string): User {
    // In a real app, decode JWT token
    return {
      id: 1,
      email: 'test@test.com',
      name: 'Test User',
      role: 'client'
    };
  }
}