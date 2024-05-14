import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${this.url}/categories`);
  }

  get(id: string) {
    return this.httpClient.get(`${this.url}/categories/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/categories/delete/${id}`);
  }

  save(category: Category) {
    return this.httpClient.post(`${this.url}/categories/`, category);
  }

  update(id: string, category: Category) {
    return this.httpClient.put<any>(`${this.url}/categories/${id}`, category);
  }
}
