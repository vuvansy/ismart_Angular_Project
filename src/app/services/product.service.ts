import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, private auth: AuthService) {}

  getAll() {
    return this.httpClient.get(`${this.url}/products`);
  }

  get(id: string) {
    return this.httpClient.get(`${this.url}/products/${id}`);
  }

  searchProductsByName(name: string) {
    const encodedName = encodeURIComponent(name);
    return this.httpClient.get<Product[]>(
      `${this.url}/products/search?name=${encodedName}`
    );
  }

  //Để đảm bảo tham số name được encode đúng cách, ta sử dụng hàm encodeURIComponent()
  //để mã hóa các ký tự đặc biệt (như khoảng trắng) trong tham số.

  getProductByCategoryId(categoryId: string) {
    return this.httpClient.get(`${this.url}/products/categories/${categoryId}`);
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
