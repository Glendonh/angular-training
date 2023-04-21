import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private _http: HttpClient) {}
  private products: Observable<Product[]>;
  getProducts() {
    if (!this.products) {
      this.products = this._http.get<Product[]>(
        'https://fakestoreapi.com/products'
      );
    }
    return this.products;
  }
  getProductById(id: string) {
    return this._http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }
}
