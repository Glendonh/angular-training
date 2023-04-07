import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private _http: HttpClient) {}
  getProducts() {
    return this._http.get<Product[]>('https://fakestoreapi.com/products');
  }
  getProductById(id: string) {
    return this._http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }
}
