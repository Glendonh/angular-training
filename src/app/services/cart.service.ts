import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: [{ productId: number; quantity: number }];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private _http: HttpClient) {}
  getCartById(id: number) {
    return this._http.get<Cart>(`https://fakestoreapi.com/carts/${id}`);
  }
}
