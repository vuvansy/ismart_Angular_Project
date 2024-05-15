import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${this.url}/products`);
  }

  get(id: string) {
    return this.httpClient.get(`${this.url}/products/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/products/delete/${id}`);
  }

  save(product: Product) {
    return this.httpClient.post(`${this.url}/products/`, product);
  }

  update(id: string, product: Product) {
    return this.httpClient.put<any>(`${this.url}/products/${id}`, product);
  }
}
