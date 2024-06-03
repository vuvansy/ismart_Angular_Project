import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  url = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = sessionStorage.getItem('user');
      if (jsonData) {
        this.loggedIn = true;
        resolve(this.loggedIn);
      } else {
        resolve(this.loggedIn);
      }
    });
    return promise;
  }

  isAdmin() {
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = sessionStorage.getItem('user');
      if (jsonData) {
        if (JSON.parse(jsonData).data.role === '1') {
          this.loggedIn = true;
          resolve(this.loggedIn);
        }
      } else {
        resolve(this.loggedIn);
      }
    });
    return promise;
  }

  checkLogin() {
    let jsonData = sessionStorage.getItem('user');
    if (jsonData) {
      return JSON.parse(jsonData).data;
    }
    return false;
  }

  checkAdmin() {
    let jsonData = sessionStorage.getItem('user');
    if (jsonData) {
      if (JSON.parse(jsonData).data.role === '1') {
        return JSON.parse(jsonData).data;
      }
    }
  }

  getToken() {
    let jsonData = sessionStorage.getItem('user');
    if (jsonData) {
      return JSON.parse(jsonData).access_token;
    }
    return false;
  }

  getRefreshToken() {
    let jsonData = sessionStorage.getItem('user');
    if (jsonData) {
      return JSON.parse(jsonData).refresh_token;
    }
    return false;
  }

  refreshToken(refreshToken: any): any {
    return this.httpClient.post<any>(
      `${this.url}/users/refresh-token`,
      refreshToken
    );
  }
}
