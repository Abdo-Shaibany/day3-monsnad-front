// auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token'; // Key for storing the token

  constructor() { }

  public getUser(): User | null {
    const token = this.getToken();
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64)) as User;
    }

    return null;
  }

  // Store the token in localStorage
  public storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Retrieve the token from localStorage
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Remove the token from localStorage
  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Check if the user is authenticated
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null; // You can add more checks here (e.g., token expiration)
  }
}