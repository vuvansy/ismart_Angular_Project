import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${this.url}/users`);
  }

  get(id: string) {
    return this.httpClient.get(`${this.url}/users/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/users/delete/${id}`);
  }

  save(user: User): Observable<any> {
    return this.httpClient.post(`${this.url}/users/register`, user);
  }

  update(id: string, user: User) {
    return this.httpClient.put<any>(`${this.url}/users/${id}`, user);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.httpClient.post(`${this.url}/users/login`, body);
  }

  //Observables trong HttpClient: Khi sử dụng HttpClient trong Angular để
  //gửi các HTTP requests, các phản hồi được trả về dưới dạng Observable.
}
